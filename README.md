# cswrecks

![CS Wrecks Logo](https://www.cswrecks.com/cswrecks-logo.png)


**cswrecks** is a webring for **Computer Science students** at Georgia Tech.

---

## Table of Contents
- [What's a webring?](#whats-a-webring)
- [How do I join?](#how-do-i-join)
- [Credits](#credits)

---

## What's a webring?
A webring is a group of websites linked together in a circular or “ring” format, typically centered around a common theme. This was popular in the 90s to increase site discoverability. Here, **cswrecks** aims to spotlight personal websites, blogs, or portfolios of Georgia Tech CS students and alumni. By joining, we can all discover each other's work and bring more traffic to our personal websites.

## How do I join?
To add your website to **cswrecks**, you must be:
- A **current student** or an **alum** of the [Georgia Tech College of Computing](https://www.cc.gatech.edu/) or be a startup founder in the tech/engineering space.
- Committed to maintaining a personal website/portfolio (nothing inappropriate, please!).

### Steps
1. **Fork this repository** and clone it to your local machine.
2. **Create a new branch** (e.g., `add-your-name`).
3. Add your site details to the **`sites.ts`** file at the end of the `allSites` array, for example:
   ```js
   {
     name: "Your Name",
     year: 20XX, // e.g., graduation year
     website: "https://your-cool-site.com"
   }
4. **Open a pull request** on this repo. In the PR description:
   - Include your **full name**,
   - Your **graduation year** (or expected graduation),
   - Your **full website URL**,
   - A link to **another online profile** (e.g., your LinkedIn or GitHub) to help verify your identity.

5. **Wait for approval**. We’ll verify that you meet the criteria before merging.

6. **Example site entry**:
   ```js
   {
     name: "Matt Steele",
     year: 2025,
     link: "https://mattsteele.co"
   },
   {
     name: "Ananth Vivekanand",
     year: 2025,
     link: "https://ananthvivekanand.com"
   }


### Linking back
It’s highly encouraged to link back to the main site [cswrecks](https://cswrecks.com) on your own website. You can:
- Add a simple text link: `[cswrecks](https://cswrecks.com)`.
- Or link to the *previous* and *next* members in the ring (once you know who they are!).

By doing so, we keep the ring cohesive and help each other get discovered.





## Credits
**cswrecks** was [Matt Steele](https://www.mattsteele.co/) with the help and inspiration of [Ananth Vivekanand](https://ananthvivekanand.com/)

> **Inspiration**: This project was inspired by and adapted design elements and instructions from [SE Webring](https://se-webring.xyz).
