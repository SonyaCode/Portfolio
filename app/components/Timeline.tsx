import { supabase } from "@/lib/supabase"

type TimelineEvent = {
  id: number;
  date: string;
  description: string;
}

export default async function Timeline() {
    const { data: events, error } = await supabase.from("Experience").select("*").order("id", { ascending: true })

    return (
        <section className="bg-light-blue">
            <div className="py-10 px-6 md:py-15 md:px-35 mx-auto">
                <h2 className="text-2xl md:text-3xl font-semibold">Timeline</h2>
                <div className="relative w-full pb-15 md:pb-25">
                    <div className="absolute left-4 md:left-1/2 top-0 h-full w-0.5 -translate-x-1/2 bg-dark-bluish-purple"></div>
                    <div className="flex flex-col gap-10 md:gap-20 mt-5">
                        { events?.map((event: TimelineEvent, index: number) => {
                        const side = index % 2 === 0 ? "left" : "right";
                        return (
                            <div key={event.id} className={`relative flex items-start md:items-center ${index === 0 ? "mt-10 md:mt-25" : ""}`}>
                                <div className="absolute left-4 top-1.5 w-3 h-3 -translate-x-1/2 rounded-full bg-dark-bluish-purple md:hidden"></div>

                                { side === "left" ? (
                                    <>
                                        <div className="w-full md:w-1/2 min-w-0 pl-12 lg:pl-40 md:pr-24  text-left">
                                            <h5 className="text-xl font-semibold">{event.date}</h5>
                                            <p className="mt-1">{event.description}</p>
                                        </div>
                                        <div className="relative hidden md:flex w-0 items-center justify-center">
                                            <div className="absolute right-0 h-0.5 w-20 bg-dark-bluish-purple"></div>
                                            <div className="absolute right-20 top-1/2 w-3 h-3 -translate-y-1/2 rounded-full bg-dark-bluish-purple"></div>
                                        </div>
                                        <div className="hidden md:block w-1/2"></div>
                                    </>
                                ) : (
                                    <>
                                        <div className="hidden md:block w-1/2"></div>
                                        <div className="hidden md:flex relative w-0 items-center justify-center">
                                            <div className="absolute left-0 h-0.5 w-20 bg-dark-bluish-purple"></div>
                                            <div className="absolute left-20 top-1/2 w-3 h-3 -translate-y-1/2 rounded-full bg-dark-bluish-purple"></div>
                                        </div>
                                        <div className="w-full md:w-1/2 min-w-0 pl-12 md:pl-40 text-left">
                                            <h5 className="text-lg md:text-xl font-semibold">{event.date}</h5>
                                            <p className="mt-1">{event.description}</p>
                                        </div>
                                    </>
                                )}
                            </div>
                        )
                    })}
                    </div>
                </div>
            </div>
        </section>
    );
}