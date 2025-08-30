import { type NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
	try {
		const { email } = await request.json();

		if (!email) {
			return NextResponse.json({ error: "Email is required" }, { status: 400 });
		}

		// TODO: Integrate with Resend for newsletter signup
		// This is a placeholder for now
		console.log("Newsletter signup:", email);

		return NextResponse.json({ message: "Successfully subscribed!" });
	} catch (error) {
		console.error("Newsletter signup error:", error);
		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 },
		);
	}
}

export async function DELETE(request: NextRequest) {
	try {
		const { email } = await request.json();

		if (!email) {
			return NextResponse.json({ error: "Email is required" }, { status: 400 });
		}

		// TODO: Integrate with Resend for newsletter unsubscribe
		// This is a placeholder for now
		console.log("Newsletter unsubscribe:", email);

		return NextResponse.json({ message: "Successfully unsubscribed!" });
	} catch (error) {
		console.error("Newsletter unsubscribe error:", error);
		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 },
		);
	}
}
