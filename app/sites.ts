// data/sites.ts

export interface Site {
    name: string;
    year: number;
    website: string;
  }
  
  export const allSites: Site[] = [
    {
      name: "Matt Steele",
      year: 2025,
      website: "https://www.mattsteele.co/",
    },
    {
        name: "Ben Steele",
        year: 2025,
        website: "https://www.bensteele.net/",
      },
      {
        name: "Ananth Vivekanand",
        year: 2025,
        website: "https://ananthvivekanand.com/",
      },
      {
        name: "Alex Wang",
        year: 2027,
        website: "https://www.alexwang.info/",
      },
      {
        name: "Varun Patel",
        year: 2027,
        website: "https://www.bluehandcoding.com/"
      },
      {
        name: "Aidan Pratt",
        year: 2025,
        website: "https://aidanpratt.com/"
      }
  ];