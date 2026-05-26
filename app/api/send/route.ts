import { NextRequest, NextResponse } from "next/server";

// Force dynamic so Next.js never tries to statically evaluate this route.
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY is not set");
    return NextResponse.json({ error: "Email service not configured" }, { status: 500 });
  }

  // Dynamic import — keeps the resend module out of the static build graph
  // entirely. Resend v6 runs module-level initialization that throws
  // "Missing API key" when webpack evaluates it at build time; deferring
  // the import to request time avoids that completely.
  const { Resend } = await import("resend");
  const resend = new Resend(apiKey);

  try {
    const formData = await req.formData();

    const name      = formData.get("name") as string;
    const email     = formData.get("email") as string;
    const phone     = formData.get("phone") as string;
    const org       = formData.get("org") as string;
    const itemType  = formData.get("itemType") as string;
    const garments  = formData.get("garments") as string;
    const qty       = formData.get("qty") as string;
    const placement = formData.get("placement") as string;
    const timeline  = formData.get("timeline") as string;
    const notes     = formData.get("notes") as string;
    const file      = formData.get("file") as File | null;

    const rows = [
      ["Name",           name],
      ["Email",          email],
      ["Phone",          phone || "—"],
      ["Organization",   org || "—"],
      ["Item type",      itemType || "—"],
      ["Garments",       garments || "—"],
      ["Quantity",       qty || "—"],
      ["Placement",      placement || "—"],
      ["Timeline",       timeline || "—"],
      ["Notes",          notes || "—"],
    ];

    const html = `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto">
        <h2 style="color:#1a1a2e;border-bottom:2px solid #C4A97A;padding-bottom:12px">
          New Quote Request · Yazoo Threads
        </h2>
        <table style="width:100%;border-collapse:collapse">
          ${rows.map(([k, v]) => `
            <tr>
              <td style="padding:10px 12px;background:#f5f5f5;font-weight:600;
                         width:160px;font-size:13px;color:#555;vertical-align:top">${k}</td>
              <td style="padding:10px 12px;font-size:14px;color:#1a1a2e">${v}</td>
            </tr>
          `).join("")}
        </table>
        ${file ? `<p style="margin-top:20px;font-size:13px;color:#555">
          Logo file attached: <strong>${file.name}</strong></p>` : ""}
        <hr style="margin:28px 0;border:none;border-top:1px solid #eee"/>
        <p style="font-size:12px;color:#999">
          Submitted via yazoothreads.com · Reply directly to ${email}
        </p>
      </div>
    `;

    const attachments: { filename: string; content: Buffer }[] = [];
    if (file && file.size > 0) {
      const buffer = Buffer.from(await file.arrayBuffer());
      attachments.push({ filename: file.name, content: buffer });
    }

    const { error } = await resend.emails.send({
      from:        "Yazoo Threads Website <onboarding@resend.dev>",
      to:          "info@yazoothreads.com",
      replyTo:     email,
      subject:     `Quote Request — ${name}${org ? " · " + org : ""}`,
      html,
      attachments,
    });

    if (error) {
      console.error("Resend error:", JSON.stringify(error));
      return NextResponse.json(
        { error: "Failed to send email", detail: error },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("API route error:", message);
    return NextResponse.json({ error: "Server error", detail: message }, { status: 500 });
  }
}
