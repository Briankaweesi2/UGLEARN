import sql from "@/app/api/utils/sql";
import { auth } from "@/auth";

export async function GET(request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const profiles = await sql`
      SELECT 
        up.*,
        au.email,
        au.name as auth_name
      FROM user_profiles up
      JOIN auth_users au ON up.user_id = au.id
      WHERE up.user_id = ${session.user.id}
    `;

    return Response.json({ profiles });
  } catch (error) {
    console.error("Error fetching profiles:", error);
    return Response.json({ error: "Failed to fetch profiles" }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { role, full_name, grade_level, school_name, language_preference } = body;

    if (!role || !full_name) {
      return Response.json({ error: "Role and full name are required" }, { status: 400 });
    }

    if (!['student', 'teacher', 'parent'].includes(role)) {
      return Response.json({ error: "Invalid role" }, { status: 400 });
    }

    // Check if profile already exists
    const existingProfile = await sql`
      SELECT id FROM user_profiles WHERE user_id = ${session.user.id}
    `;

    if (existingProfile.length > 0) {
      return Response.json({ error: "Profile already exists" }, { status: 400 });
    }

    const profile = await sql`
      INSERT INTO user_profiles (
        user_id, role, full_name, grade_level, school_name, language_preference
      ) VALUES (
        ${session.user.id}, ${role}, ${full_name}, ${grade_level || null}, 
        ${school_name || null}, ${language_preference || 'en'}
      )
      RETURNING *
    `;

    return Response.json({ profile: profile[0] });
  } catch (error) {
    console.error("Error creating profile:", error);
    return Response.json({ error: "Failed to create profile" }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { full_name, grade_level, school_name, language_preference } = body;

    const updates = [];
    const values = [];
    let paramIndex = 1;

    if (full_name !== undefined) {
      updates.push(`full_name = $${paramIndex++}`);
      values.push(full_name);
    }
    if (grade_level !== undefined) {
      updates.push(`grade_level = $${paramIndex++}`);
      values.push(grade_level);
    }
    if (school_name !== undefined) {
      updates.push(`school_name = $${paramIndex++}`);
      values.push(school_name);
    }
    if (language_preference !== undefined) {
      updates.push(`language_preference = $${paramIndex++}`);
      values.push(language_preference);
    }

    if (updates.length === 0) {
      return Response.json({ error: "No fields to update" }, { status: 400 });
    }

    updates.push(`updated_at = NOW()`);
    values.push(session.user.id);

    const query = `
      UPDATE user_profiles 
      SET ${updates.join(', ')} 
      WHERE user_id = $${paramIndex}
      RETURNING *
    `;

    const profile = await sql(query, values);

    if (profile.length === 0) {
      return Response.json({ error: "Profile not found" }, { status: 404 });
    }

    return Response.json({ profile: profile[0] });
  } catch (error) {
    console.error("Error updating profile:", error);
    return Response.json({ error: "Failed to update profile" }, { status: 500 });
  }
}