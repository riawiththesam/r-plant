export const jobTypes = ["warrior", "mage"] as const;
export type JobType = (typeof jobTypes)[number];

export function getHitRateBonus(job: JobType, level: number): number {
  switch (job) {
    case "warrior":
      return Math.floor(level / 3 + 2);
    case "mage":
      return Math.floor(level / 5);
  }
}

export function getNumberOfAttacks(job: JobType, level: number): number {
  switch (job) {
    case "warrior":
      return Math.max(Math.floor(level / 5 + 1), 10);
    case "mage":
      return 1;
  }
}
