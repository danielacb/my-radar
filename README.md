# My Jobs Radar

### Project Goal
This project is designed to simplify your job search by allowing you to add companies you’re interested in working for. The app will automatically scan their career pages for specific job-related keywords. This saves you the effort of manually checking career pages daily and enables you to scan many companies in just seconds.

![image](https://github.com/user-attachments/assets/4be824a8-9953-47fb-815a-b4f5eea3f2a7)


### Technologies Used
- [Puppeteer](https://pptr.dev/): Automates the scanning of company career pages for job postings.
- [Next.js](https://nextjs.org/): Utilizes the API route features to run Puppeteer and handle backend logic.
- [Next UI](https://nextui.org/) & [Tailwind CSS](https://tailwindcss.com/): Provides a responsive and visually appealing UI while speeding up development.
- [Convex.dev](https://www.convex.dev/): Serves as the backend to store and manage company and job information.


This project was bootstrapped using the Next.js 14 (app directory) and NextUI (v2) [template](https://nextui.org/docs/frameworks/nextjs).

## How to Use

### How to Run the Project Locally

1. Clone the repository and install dependencies:

```bash
npm install
```

3. Set up a Convex project and update your environment variables in .env:

```bash
CONVEX_DEPLOYMENT=
NEXT_PUBLIC_CONVEX_URL=
NEXT_PUBLIC_HOST=http://localhost:3000/
```

You can find the Convex deployment and URL in your Convex project settings.

3. Start the development server:

```bash
npm run dev
```

### Scanning for Jobs

Once the project is running, follow these steps:

1. Navigate to `http://localhost:3000/`.
2. Add job keywords that will be used to scan for relevant job openings across company career pages.
3. Add a company by filling out the form with the following details:
    - Company Name
    - Career Page Keyword (used to verify the page's content)
    - Company Website
    - Career Page URL
  
> The Career Page Keyword ensures that the career page hasn’t changed since you added the company.

## Future Plans

### Upcoming Features
- User Authentication: Allow non-technical users to log in and add their own companies without needing to clone the repo.
- Job Scanning Scheduler: Automate job scans at set intervals.
- Email Notifications: Notify users via email when new job openings are found.

### Improvements
- Implement unit tests and end-to-end tests to ensure the app’s reliability.

### Contributing and Contact
If you'd like to contribute to this project or have any questions, feel free to open an issue or contact me directly at [contato@danielacb.com](mailto:contato@danielacb.com). I'm always open to feedback, suggestions, and collaboration opportunities!

