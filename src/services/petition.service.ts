import "server-only";

import { db } from "@/src/db";
import { notesTable, petitionsTable } from "@/src/db/schema";
import { count, desc, gte } from "drizzle-orm";
import { formatWeekLabel } from '../lib/utils';

export type CreatePetitionInput = {
  firstName: string;
  lastName: string;
  emailAddress: string;
  occupation?: string;
  affiliation?: string;
};

/* Sign a petition
 * Returns the created petition
 */

export async function signPetition(data: CreatePetitionInput) {
  const occupation = data.occupation ?? "";
  const affiliation = data.affiliation ?? "";
  
  const [petition] = await db.insert(petitionsTable).values({
    firstName: data.firstName,
    lastName: data.lastName,
    emailAddress: data.emailAddress,
    occupation,
    affiliation,
  }).returning();

  return petition;
}

/* Get the total count of petition signatures */

export async function getPetitionCount() {
  const [result] = await db
    .select({ count: count() })
    .from(petitionsTable);

  return result?.count ?? 0;
}

/* Get recent petition signees
 * Returns the most recent petition signatures
 */
export async function getRecentPetitions(limit = 10) {
  return db
    .select()
    .from(petitionsTable)
    .orderBy(desc(petitionsTable.createdAt))
    .limit(limit);
}

/* Get petition signatures grouped by week
 * Returns data for the last 8 weeks
 */
export async function getPetitionsByWeek() {
  // Calculate date 8 weeks ago
  const eightWeeksAgo = new Date();
  eightWeeksAgo.setDate(eightWeeksAgo.getDate() - 56);

  // Get all petitions from the last 8 weeks
  const petitions = await db
    .select({
      createdAt: petitionsTable.createdAt,
    })
    .from(petitionsTable)
    .where(gte(petitionsTable.createdAt, eightWeeksAgo))
    .orderBy(petitionsTable.createdAt);

  // Group by week
  const weeklyData: Record<string, number> = {};
  
  petitions.forEach((petition) => {
    const date = new Date(petition.createdAt);
    const weekStart = getWeekStart(date);
    const weekKey = formatWeekLabel(weekStart);
    
    weeklyData[weekKey] = (weeklyData[weekKey] || 0) + 1;
  });

  // Generate labels for the last 8 weeks
  const chartData = [];
  const today = new Date();
  
  for (let i = 7; i >= 0; i--) {
    const weekDate = new Date();
    weekDate.setDate(today.getDate() - (i * 7));
    const weekStart = getWeekStart(weekDate);
    const weekKey = formatWeekLabel(weekStart);
    
    chartData.push({
      date: weekKey,
      signatures: weeklyData[weekKey] || 0,
    });
  }

  return chartData;
}

/* Helper function to get the start of the week (Monday) */
function getWeekStart(date: Date): Date {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1); // Adjust for Sunday
  return new Date(d.setDate(diff));
}


