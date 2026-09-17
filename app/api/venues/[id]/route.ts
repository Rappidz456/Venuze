import { NextResponse } from "next/server";
import { getVenueById } from "@/data/venues";

export async function GET(
  _request: Request,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;
  const venue = getVenueById(id);

  if (!venue) {
    return NextResponse.json({ error: "Venue not found" }, { status: 404 });
  }

  return NextResponse.json({ venue });
}
