import { supabase } from "@/lib/supabase";

type Projects = {
    id: number;
    title: string;
    description: string;
    type_of_project: Date;
    link: string;
    creation_date: string;
}

export const ProjectCard = ({ project } : { project: Projects }) => {
    console.log("hi" + project);
    return (
        <div className="bg-white rounded p-5 text-center">
            <h5 className="text-xl font-semibold">{project.title}</h5>
            <p>Creation Date: {new Date(project.creation_date).toLocaleDateString("en-US", { month: "long", year: "numeric" })}</p>
            <p className="mt-3">{project.description}</p>
            <a href={project.link} className="font-semibold inline-block px-4 py-2 rounded bg-dark-bluish-purple text-white mt-5 hover:brightness-125" target="_blank">
                Link
            </a>
        </div>
    )
}

export default async function Projects() {
    const { data: projects } = await supabase.from("Projects").select("*").order("creation_date", { ascending: false });
    const javaProjects : Projects[] = [];
    const pythonProjects : Projects[] = [];
    const webDevProjects : Projects[] = [];
    const appDevProjects : Projects[] = [];

    projects?.forEach((project) => {
        if (project.type_of_project == "Java") {
            javaProjects.push(project);
        } else if (project.type_of_project == "Python") {
            pythonProjects.push(project);
        } else if (project.type_of_project == "Web Development") {
            webDevProjects.push(project);
        } else if (project.type_of_project == "App Development") {
            appDevProjects.push(project);
        }
    })

    const filters = [
        { label: "Web Development", id: "web-development" },
        { label: "Java", id: "java" },
        { label: "Python", id: "python" },
        { label: "App Development", id: "app-development" }

    ]
    

    return (
       <section className="bg-medium-bluish-purple">
            <div className="p-10">
                <h2 className="text-4xl font-semibold text-white">Projects</h2>
                <div className="mt-4">
                    {filters.map((filter) => (
                        <a key={filter.id} href={`#${filter.id}`} className="rounded-full px-4 py-2 text-sm font-medium bg-white/10 text-white hover:bg-white/20 transition-colors mr-2">{filter.label}</a>
                    ))}
                </div>

                <h3 id="web-development" className="text-3xl text-white font-semibold mt-8 mb-4">Web Development</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-15 mb-10">
                    {webDevProjects?.map((project: Projects) => (    
                        <ProjectCard key={project.id} project={project} />
                    ))}
                </div>

                <div id="java" className="w-full h-px bg-white/30"></div>
                <h3 className="text-3xl text-white font-semibold mt-5 mb-4">Java</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mb-10">
                    {javaProjects?.map((project: Projects) => (    
                        <ProjectCard key={project.id} project={project} />
                    ))}
                </div>

                <div id="python" className="w-full h-px bg-white/30"></div>
                <h3 className="text-3xl text-white font-semibold mt-5 mb-4">Python</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mb-10">
                    {pythonProjects?.map((project: Projects) => (    
                        <ProjectCard key={project.id} project={project} />
                    ))}
                </div>
                
                <div id="app-development" className="w-full h-px bg-white/30"></div>
                <h3 className="text-3xl text-white font-semibold mt-5 mb-4">App Development</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mb-10">
                    {appDevProjects?.map((project: Projects) => (    
                        <ProjectCard key={project.id} project={project} />
                    ))}
                </div>
            </div>

            

        </section>
    )
}