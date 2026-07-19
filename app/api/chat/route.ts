import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import { supabase } from "@/lib/supabase";


export async function POST(request: NextRequest) {
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY});

    try {
        const { message } = await request.json();

        const { data: experience } = await supabase.from("Experience").select("date, description").order("id", { ascending: true });

        const experienceText = experience?.map((e) => `${e.date} : ${e.description}`).join("\n");
        const resume = `SONYA'S RESUME
        Education:
        Sonya is pursuing a Bachelor of Science in Computer Science at Cornell University in Ithaca, NY, with an expected graduation date of May 2029. She is involved in Cornell Assistive Technologies as a Web Developer through student organization involvement.
        Her relevant coursework includes Object-Oriented Programming and Data Structures, AP Computer Science A, PLTW Digital Electronics, Linux & SQL, Web Development, and Mobile App Development.

        Work Experience:
        IT Intern (AI) at HUGO BOSS, NYC (June 2026 - Present):
        - Built a cybersecurity AI agent using Microsoft Copilot Studio to classify incidents, assess impact, and recommend playbook updates. Developed an HR self-service agent to answer policy questions, 
        guide employees through key processes, and support onboarding. Created a design agent to analyze product return trends, retrieve fashion research, and generate concept images for inspiration. Authored 3 guides teaching teams how to build and deploy their own Copilot-based cyber, HR, and design agents.

        Web Developer at Cornell Assistive Technologies, Ithaca, NY (November 2025 - Present):
        - Implemented accessibility-first design decisions in Figma, creating a more intuitive user experience through stronger visual hierarchy and improved readability. Developed a responsive, accessible
        website using Next.js, TypeScript, and Tailwind CSS. Collaborated with other developers to streamline deployment workflows with Vercel, enabling faster updates. Integrated Supabase for backend data handling to support future platform scalability and feature expansion.

        Intern at Processing Foundation, Remote (March 2025 - June 2025):
        - Collaborated with open-source maintainers to research, prototype, and propose UX improvements for the p5.js web editor Account Settings page. Redesigned the Account Settings page using Figma with a
        stronger focus on clarity and usability. Built an interactive prototype of the redesigned page using HTML, CSS, and JavaScript.

        Community Involvement & Leadership:
        Lead Web Developer at H.O.P.E. Club, Brooklyn, NY (August 2024 - July 2025):
        - Led the Web Development team to design and develop a new website using Wix to strengthen the club's online presence. Organized fundraising initiatives that increased community participation.
        - Coordinated volunteer events by organizing schedules, assigning responsibilities, and ensuring a safe and positive experience for participants.

        Technical Projects:
        Pac-Man	(April 2026 – May 2026):
        GitHub: https://github.com/SonyaCode/PacMan
        - Built a Pac-Man game in Java, using BFS for maze construction and Dijkstra’s algorithm for the ghost’s navigation.
        - Created an autonomous Pac-Man bot that uses rule-based decision-making to prioritize fleeing from nearby ghosts, chasing vulnerable ghosts for bonus points, and navigating to the nearest pellets using Dijkstra’s algorithm.

        Anti Slack Off (July 2025 - August 2025):
        GitHub: https://github.com/SonyaCode/AntiBrainrot
        - Built a productivity-focused Chrome extension that helps users reduce distractions through customizable website blocking tools.

        ShareLemon (December 2024 - January 2025):
        GitHub: https://github.com/SonyaCode/ShareLemon
        - Developed a social media website that allows users to post about their daily lives. Integrated Google Firestore to enable reliable real-time data synchronization and responsive content updates.
        - Strengthened platform security by implementing secure user authentication.

        Space Shooter Game (May 2024 - June 2024):
        GitHub: https://github.com/SonyaCode/Space-Shooter
        - Developed a classic space shooter arcade game using Java Swing and AWT, applying event-driven programming principles to create an interactive gameplay experience.

        Skills, Publications and Interests:
        Technical Skills: Python, Java, HTML & CSS, JavaScript, Kotlin, Swift
        Languages: Mandarin (Native Speaker), English (Fluent Speaker)`



        const SYSTEM_CONTEXT = `You are an AI chatbot assistant on Sonya's portfolio website. Sonya is a Chinese-American, growing up in NYC. She is currently a Computer Science student at Cornell University, with an expected graduation date of May 2029. She went to Brooklyn Technical High School and graduated in 2025.
        She is proficient in Java, Python, and Web Development.
        She likes to play Genshin Impact and read Chinese web novels in her free time.
        Fun facts: 
        1. She is left-handed! 
        2. She took French in high school. Right now, she can still read some French, but she is horrible at speaking it.
        3. Her favorite card game is Monopoly Deal.
        4. She doesn't have a favorite color, but she prefers light colors over dark colors.
        5. She loves Chinese songs.
        Here is her resume: ${resume}
        Here is her work experience: ${experienceText}
        
        Instructions:
        - Answer visitor questions about Sonya based ONLY on the information provided above.
        - Keep responses friendly and concise (2-3 sentences max).
        - If a question is about Sonya but the answer isn't included in the info above (e.g. her favorite color, her GPA, personal opinions not listed), respond that you don't have that information, and suggest the visitor reach out to Sonya directly via the contact page.
        - If a question is completely unrelated to Sonya or her portfolio (e.g. general trivia, coding help unrelated to her, or unrelated topics), politely redirect the conversation back to Sonya's background and work.
        - NEVER make up details that aren't explicitly provided above."
        `;

        const response = await ai.models.generateContent({
            model: "gemini-3.1-flash-lite",
            contents: message,
            config: {
                systemInstruction: SYSTEM_CONTEXT,
            },
        });

        return NextResponse.json({ reply: response.text });

    } catch (error) {
        console.error(error);
    }

}

