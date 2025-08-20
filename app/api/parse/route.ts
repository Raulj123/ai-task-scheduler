import { NextResponse } from "next/server";
import * as chrono from "chrono-node";

export async function POST(request: Request) {
  const { input } = await request.json();

  if (!input) {
    return NextResponse.json({ error: "Missing input" }, { status: 400 });
  }

  // extract sumary with regex
  const summaryMatch = input.match(/"(.*?)"|of (.*?) on/);
  const summary = summaryMatch
    ? summaryMatch[1] || summaryMatch[2]
    : "Untitled Appoinment";

  /* const parseDate = Chrono.parse(input, new Date("2025-08-16"), { */
  /*   forwardDate: true, */
  /* }); */

  const parseDate = chrono.parse(input, new Date("2025-08-16"), {
    forwardDate: true,
  });

  // if the list does not exist, return Response for invalid
  if (!parseDate.length) {
    return NextResponse.json({ error: "Invalid date/time" }, { status: 400 });
  }

  const date = parseDate[0].start.date();
  const formattedDate = date.toISOString().split("T")[0];
  const formattedTime = date.toTimeString().slice(0, 5);

  // mocking delay here
  var delay = 2000;
  var wait = new Promise((resolve) => setTimeout(resolve, delay));
  await wait;

  return NextResponse.json({
    message: "Parsed successful",
    data: {
      summary,
      date: formattedDate,
      time: formattedTime,
      duration_minutes: 60,
    },
  });
}
