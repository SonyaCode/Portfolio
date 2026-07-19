"use client"
import { useState } from "react";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore"


export default function Contact() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    })
    const [submitted, setSubmitted] = useState(false)

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    };

    const handleSubmit = async (e: React.SubmitEvent) => {
        e.preventDefault();
        
        try {
            await addDoc(collection(db, "contactMessages"), {
                ...form,
                createdAt: serverTimestamp(),
            });
            setForm( { name: "", email: "", subject: "", message: ""});
            setSubmitted(true);
        } catch (err) {
            console.error(err)
        }
    }
    
    return (
        <section className="grid grid-cols-1 md:grid-cols-2 min-h-[calc(100vh-150px)]">
            { submitted ? 
            <div className="bg-light-blue p-10 md:p-16">
                <h2 className="text-3xl">Your response has been recorded. I will get back to you as soon as possible.</h2>
            </div> :
            <div className="bg-light-blue p-10 md:p-16">
                <h2 className="text-3xl font-semibold">Send a message</h2>
                <form className="mt-10 flex flex-col gap-10" onSubmit={handleSubmit}>
                    <div className="flex flex-col sm:flex-row gap-10 sm:gap-10">
                        <input type="text" name="name" placeholder="Name" value={form.name} onChange={handleChange} className="flex-1 border-b-2 border-dark-bluish-purple placeholder-dark-bluish-purple/80 focus:outline-none" required/>
                        <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} className="flex-1 bg-transparent border-b-2 border-dark-bluish-purple placeholder-dark-bluish-purple/80 focus:outline-none" required/>
                    </div>

                    <input type="text" name="subject" placeholder="Subject" value={form.subject} onChange={handleChange} className="border-b-2 border-dark-bluish-purple placeholder-dark-bluish-purple/80 focus:outline-none" required/>

                    <textarea name="message" placeholder="Message" rows={6} value={form.message} onChange={handleChange} className="border-b-2 border-dark-bluish-purple placeholder-dark-bluish-purple/80 focus:outline-none" required></textarea>

                    <button type="submit" className="bg-dark-bluish-purple text-white self-start rounded px-3 py-1 mt-4 bold cursor-pointer">Submit</button>
                </form>

            </div>
            }
            

            <div className="bg-medium-bluish-purple p-10 md:p-20">
                <h2 className="text-3xl font-semibold text-white">Contact me</h2>
                <div className="flex flex-col gap-5 mt-8">
                    <div className="flex items-center gap-2">
                        <img className="w-8 h-8" src="/assets/google-icon.svg" alt="Google icon" />
                        <a href="mailto:z.sonya2829@gmail.com" className="text-white underline">z.sonya2829@gmail.com</a>
                    </div>
                    <div className="flex items-center gap-2">
                        <img className="w-8 h-8" src="/assets/linkedin-icon.svg" alt="LinkedIn icon" />
                        <p className="text-white">Sonya Zheng</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <img className="w-8 h-8" src="/assets/github-icon.svg" alt="GitHub icon" />
                        <p className="text-white">SonyaCode</p>
                    </div>

                </div>

            </div>
        </section>
    )
}