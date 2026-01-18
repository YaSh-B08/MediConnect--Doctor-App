"use server";

import { db } from "@/lib/generated/prisma";

/**
 * Get doctors by specialty
 */
export async function getDoctorsBySpecialty(specialty) {
  try {
    const doctors = await db.user.findMany({
      where: {
        role: "DOCTOR",
        verificationStatus: "VERIFIED",
        // specialty: specialty.split("%20").join(" "),
        
        // Accept either a slug (e.g. "general-medicine") or encoded name ("General%20Medicine")
        specialty: decodeURIComponent(specialty).replace(/-/g, " "),
      },
      orderBy: {
        name: "asc",
      },
    });

    return { doctors };
  } catch (error) {
    console.error("Failed to fetch doctors by specialty:", error);
    return { error: "Failed to fetch doctors" };
  }
}
