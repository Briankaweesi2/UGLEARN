import sql from "@/app/api/utils/sql";
import { auth } from "@/auth";

export async function GET(request) {
  try {
    const url = new URL(request.url);
    const gradeLevel = url.searchParams.get('grade_level');

    let query = `
      SELECT s.*, 
        COUNT(t.id) as topic_count
      FROM subjects s
      LEFT JOIN topics t ON s.id = t.subject_id
    `;
    
    const values = [];
    
    if (gradeLevel) {
      query += ` WHERE $1 = ANY(s.grade_levels)`;
      values.push(gradeLevel);
    }
    
    query += ` GROUP BY s.id ORDER BY s.name`;

    const subjects = await sql(query, values);

    return Response.json({ subjects });
  } catch (error) {
    console.error("Error fetching subjects:", error);
    return Response.json({ error: "Failed to fetch subjects" }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Check if user is teacher or admin
    const userProfile = await sql`
      SELECT role FROM user_profiles WHERE user_id = ${session.user.id}
    `;

    if (userProfile.length === 0 || userProfile[0].role !== 'teacher') {
      return Response.json({ error: "Only teachers can create subjects" }, { status: 403 });
    }

    const body = await request.json();
    const { name, code, description, grade_levels } = body;

    if (!name || !code || !grade_levels) {
      return Response.json({ error: "Name, code, and grade levels are required" }, { status: 400 });
    }

    const subject = await sql`
      INSERT INTO subjects (name, code, description, grade_levels)
      VALUES (${name}, ${code}, ${description || null}, ${grade_levels})
      RETURNING *
    `;

    return Response.json({ subject: subject[0] });
  } catch (error) {
    console.error("Error creating subject:", error);
    if (error.message.includes('duplicate key')) {
      return Response.json({ error: "Subject code already exists" }, { status: 400 });
    }
    return Response.json({ error: "Failed to create subject" }, { status: 500 });
  }
}