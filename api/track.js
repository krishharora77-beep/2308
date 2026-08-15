import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL);

export default async function handler(req, res) {
    // Only accept POST requests
    if (req.method !== "POST") {
        return res.status(405).json({
            success: false,
            message: "Method not allowed"
        });
    }

    try {
        const { session_id, event, page } = req.body || {};

        // Basic validation
        if (!session_id || !event) {
            return res.status(400).json({
                success: false,
                message: "Missing session_id or event"
            });
        }

        await sql`
            INSERT INTO events (session_id, event, page)
            VALUES (${session_id}, ${event}, ${page || null})
        `;

        return res.status(200).json({
            success: true
        });

    } catch (error) {
        console.error("Tracking error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}
