import React, { Component } from 'react';
import ReactGA from 'react-ga4';

export class AboutManish extends Component {

    constructor() {
        super();
        this.screens = {};
        this.state = {
            screen: () => { },
            active_screen: "about", // by default 'about' screen is active
            navbar: false,
        }
    }

    componentDidMount() {
        this.screens = {
            "about": <About />,
            "education": <Education />,
            "skills": <Skills />,
            "projects": <Projects />,
            "resume": <Resume />
        }

        // Get last visited screen from localStorage
        let lastVisitedScreen = localStorage.getItem("about-section");
        if (lastVisitedScreen === null || lastVisitedScreen === undefined) {
            lastVisitedScreen = "about";
        }

        // Set initial screen
        this.setState({
            screen: this.screens[lastVisitedScreen],
            active_screen: lastVisitedScreen
        });
    }

    changeScreen = (e) => {
        const screenId = e.id || (e.target && e.target.id);
        if (!screenId || !this.screens[screenId]) return;

        // Update localStorage
        localStorage.setItem("about-section", screenId);

        // Update state with new screen
        this.setState({
            screen: this.screens[screenId],
            active_screen: screenId,
            navbar: false // Close navbar after selection
        });

        // Track page view
        ReactGA.send({ hitType: "pageview", page: `/${screenId}` });
    }

    showNavBar = () => {
        this.setState({ navbar: true });
    }

    hideNavBar = () => {
        this.setState({ navbar: false });
    }

    renderNavLinks = () => {
        const { active_screen } = this.state;
        return (
            <div className="flex flex-col w-full">
                <div className="flex items-center justify-between w-full bg-ub-gedit-light bg-opacity-60 border-b border-t border-blue-400 text-sm">
                    <span className="font-bold ml-2">About Me</span>
                    <div className="flex">
                        <div onClick={this.hideNavBar} className="border border-black bg-black bg-opacity-50 px-3 py-0.5 my-1 mx-1 rounded hover:bg-opacity-80 cursor-pointer">Close</div>
                    </div>
                </div>
                <div className="flex flex-col w-full">
                    <div id="about" onClick={this.changeScreen} className={`flex items-center px-4 py-2 cursor-pointer hover:bg-ub-gedit-light hover:bg-opacity-60 ${active_screen === "about" ? "bg-ub-gedit-light bg-opacity-60" : ""}`}>
                        <span className="text-ubt-gedit-blue mr-2">1</span>
                        <span>About</span>
                    </div>
                    <div id="education" onClick={this.changeScreen} className={`flex items-center px-4 py-2 cursor-pointer hover:bg-ub-gedit-light hover:bg-opacity-60 ${active_screen === "education" ? "bg-ub-gedit-light bg-opacity-60" : ""}`}>
                        <span className="text-ubt-gedit-blue mr-2">2</span>
                        <span>Education</span>
                    </div>
                    <div id="skills" onClick={this.changeScreen} className={`flex items-center px-4 py-2 cursor-pointer hover:bg-ub-gedit-light hover:bg-opacity-60 ${active_screen === "skills" ? "bg-ub-gedit-light bg-opacity-60" : ""}`}>
                        <span className="text-ubt-gedit-blue mr-2">3</span>
                        <span>Skills</span>
                    </div>
                    <div id="projects" onClick={this.changeScreen} className={`flex items-center px-4 py-2 cursor-pointer hover:bg-ub-gedit-light hover:bg-opacity-60 ${active_screen === "projects" ? "bg-ub-gedit-light bg-opacity-60" : ""}`}>
                        <span className="text-ubt-gedit-blue mr-2">4</span>
                        <span>Projects</span>
                    </div>
                    <div id="resume" onClick={this.changeScreen} className={`flex items-center px-4 py-2 cursor-pointer hover:bg-ub-gedit-light hover:bg-opacity-60 ${active_screen === "resume" ? "bg-ub-gedit-light bg-opacity-60" : ""}`}>
                        <span className="text-ubt-gedit-blue mr-2">5</span>
                        <span>Resume</span>
                    </div>
                </div>
            </div>
        );
    }

    render() {
        const { screen, navbar } = this.state;
        return (
            <div className="w-full h-full relative flex flex-col bg-ub-cool-grey text-white select-none">
                <div className="flex items-center justify-between w-full bg-ub-gedit-light bg-opacity-60 border-b border-t border-blue-400 text-sm">
                    <span className="font-bold ml-2">About Me</span>
                    <div className="flex">
                        <div onClick={this.showNavBar} className="border border-black bg-black bg-opacity-50 px-3 py-0.5 my-1 mx-1 rounded hover:bg-opacity-80 cursor-pointer">Menu</div>
                    </div>
                </div>
                <div className="relative flex-grow flex flex-col bg-ub-gedit-dark font-normal windowMainScreen">
                    <div className="absolute left-0 top-0 h-full px-2 bg-ub-gedit-darker"></div>
                    <div className="relative flex-grow flex flex-col items-center justify-start overflow-y-auto">
                        {navbar ? this.renderNavLinks() : screen}
                    </div>
                </div>
            </div>
        );
    }
}

export default AboutManish;

export const displayAboutManish = () => {
    return <AboutManish />;
}

const About = () => {
    return (
        <>
            <div className="w-20 md:w-28 my-4 bg-white rounded-full overflow-hidden relative">
                <div className="aspect-square w-full relative">
                    <img 
                        className="w-full h-full object-cover absolute top-0 left-0 transform scale-125" 
                        src="./images/logos/bitmoji.gif" 
                        alt="Manish Ghoshal Animated Profile"
                        style={{
                            clipPath: 'circle(40% at center)',
                            objectPosition: 'center 40%'
                        }}
                    />
                </div>
            </div>
            <div className=" mt-4 md:mt-8 text-lg md:text-2xl text-center px-1">
                <div>My name is <span className="font-bold">Manish Ghoshal</span> ,</div>
                <div className="font-normal ml-1">I'm an <span className="text-pink-600 font-bold">AI Engineer!</span></div>
            </div>
            <div className=" mt-4 relative md:my-8 pt-px bg-white w-32 md:w-48">
                <div className="bg-white absolute rounded-full p-0.5 md:p-1 top-0 transform -translate-y-1/2 left-0"></div>
                <div className="bg-white absolute rounded-full p-0.5 md:p-1 top-0 transform -translate-y-1/2 right-0"></div>
            </div>
            <ul className=" mt-4 leading-tight tracking-tight text-sm md:text-base w-5/6 md:w-3/4 emoji-list">
                <li className=" list-pc">
                    I'm an ambitious and passionate individual on a journey to unlock the full potential of cutting-edge technologies. With a strong foundation in building deep learning and reinforcement learning based models, complemented by a multifaceted background in web development, business development, and HR experience, I am eager to contribute my skills to the ever-evolving landscape of artificial intelligence.
                    <br /><br />
                    Throughout my career, I have had the privilege of leading and inspiring multiple teams, fostering an environment of collaboration and innovation. My analytical mindset, coupled with methodical thinking and leadership abilities, enables me to tackle complex challenges head-on and navigate through obstacles with poise. As a proactive problem solver, I find tremendous joy in exploring uncharted territories and finding solutions that create value.
                    <br /><br />
                    Having a genuine thirst for knowledge, I am an avid learner, constantly seeking opportunities to improve my skillset and stay at the forefront of technological advancements. Reinforcement Learning has captivated my interest, and I am dedicated to specializing in this field to make significant contributions to its growth. As a student, my career is in its early stages, but my dedication, enthusiasm, and adaptability set me on a trajectory towards achieving my professional aspirations. ( Hit me up <a className='text-underline' href='mailto:manishghoshal99.py@gmail.com'><u>@manishghoshal99.py@gmail.com</u></a> :) )
                </li>
                <li className=" mt-3 list-building">I enjoy building awesome software that solve practical problems.</li>
                <li className=" mt-3 list-time">When I am not coding my next project, I like to spend my time playing basketball, planning my next trip, jamming to music, reading books, playing games or exploring new technologies</li>
                <li className=" mt-3 list-star">I have a diverse set of interests, and I'm always looking for new challenges and opportunities to grow.</li>
            </ul>
        </>
    )
}

const Education = () => {
    return (
        <div className="flex-grow flex flex-col items-center justify-start overflow-y-auto p-4">
            <div className="w-full max-w-4xl">
                <h2 className="text-2xl font-bold mb-6 text-ubt-gedit-blue">Education</h2>
                <div className="space-y-6">
                    <div className="bg-ub-gedit-light bg-opacity-50 p-4 rounded-lg">
                        <h3 className="text-xl font-semibold text-ubt-gedit-blue">Master of Data Science, specialization: Computational Data Science</h3>
                        <p className="text-gray-300">University of Melbourne, Victoria, Australia</p>
                        <p className="text-gray-400">2025 - 2027 (Expected)</p>
                        <ul className="list-disc list-inside mt-2 text-gray-300">
                            <li>GPA: 3.8/4.0</li>
                            <li>Relevant Coursework: Advanced Mathematical Statistics and Probability, Machine Learning, Distributed Systems, Big Data Analytics, Data Mining, etc.</li>
                        </ul>
                    </div>
                    <div className="bg-ub-gedit-light bg-opacity-50 p-4 rounded-lg">
                        <h3 className="text-xl font-semibold text-ubt-gedit-blue">B. Tech. in Computer Science Engineering, specialization: Artificial Intelligence and Machine Learning </h3>
                        <p className="text-gray-300">Jain University, Bangalore, India</p>
                        <p className="text-gray-400">2020 - 2024</p>
                        <ul className="list-disc list-inside mt-2 text-gray-300">
                            <li>GPA: 3.62/4.0</li>
                            <li>Relevant Coursework: Data Structures, Algorithms, Database Management, Operating Systems, Computer Networks, Computer Organization and Architecture, Artificial Intelligence, Machine Learning, Deep Learning, Computer Vision, Natural Language Processing, etc.</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

const Skills = () => {
    return (
        <div className="flex-grow flex flex-col items-center justify-start overflow-y-auto p-4">
            <div className="w-full max-w-4xl">
                <h2 className="text-2xl font-bold mb-6 text-ubt-gedit-blue">Technical Skills</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-ub-gedit-light bg-opacity-50 p-4 rounded-lg">
                        <h3 className="text-xl font-semibold text-ubt-gedit-blue mb-3">Programming Languages</h3>
                        <ul className="list-disc list-inside text-gray-300">
                            <li>Python</li>
                            <li>Java</li>
                            <li>C#</li>
                            <li>JavaScript/TypeScript</li>
                            <li>HTML/CSS</li>
                            <li>SQL</li>
                        </ul>
                    </div>
                    <div className="bg-ub-gedit-light bg-opacity-50 p-4 rounded-lg">
                        <h3 className="text-xl font-semibold text-ubt-gedit-blue mb-3">Web Technologies</h3>
                        <ul className="list-disc list-inside text-gray-300">
                            <li>React.js</li>
                            <li>Next.js</li>
                            <li>FastAPI, Flask, ASP.NET</li>
                            <li>Node.js</li>
                            <li>MongoDB</li>
                            <li>REST APIs</li>
                        </ul>
                    </div>
                    <div className="bg-ub-gedit-light bg-opacity-50 p-4 rounded-lg">
                        <h3 className="text-xl font-semibold text-ubt-gedit-blue mb-3">AI & Machine Learning</h3>
                        <ul className="list-disc list-inside text-gray-300">
                            <li>Keras, TensorFlow</li>
                            <li>HuggingFace, SpaCy</li>
                            <li>Stable Diffusion</li>
                            <li>Prophet</li>
                            <li>LangGraph</li>
                            <li>Computer Vision</li>
                        </ul>
                    </div>
                    <div className="bg-ub-gedit-light bg-opacity-50 p-4 rounded-lg">
                        <h3 className="text-xl font-semibold text-ubt-gedit-blue mb-3">LLM Technologies</h3>
                        <ul className="list-disc list-inside text-gray-300">
                            <li>RAG, Langchain</li>
                            <li>ZerveAI, JinaAI</li>
                            <li>MoE, CrewAI, Autogen</li>
                            <li>Llava, LoRa/QLoRa</li>
                            <li>Unsloth, Pinecone</li>
                            <li>RunPod, Autoglon</li>
                        </ul>
                    </div>
                    <div className="bg-ub-gedit-light bg-opacity-50 p-4 rounded-lg">
                        <h3 className="text-xl font-semibold text-ubt-gedit-blue mb-3">DevOps & Tools</h3>
                        <ul className="list-disc list-inside text-gray-300">
                            <li>Docker, Kubernetes</li>
                            <li>AWS, GCP</li>
                            <li>Git, Jenkins</li>
                            <li>Linux, Command Line</li>
                            <li>VS Code, Visual Studio</li>
                            <li>Tableau</li>
                        </ul>
                    </div>
                    <div className="bg-ub-gedit-light bg-opacity-50 p-4 rounded-lg">
                        <h3 className="text-xl font-semibold text-ubt-gedit-blue mb-3">Cybersecurity</h3>
                        <ul className="list-disc list-inside text-gray-300">
                            <li>Encryption (AES, RSA)</li>
                            <li>Nmap, Wireshark</li>
                            <li>Metasploit</li>
                            <li>Snort</li>
                            <li>VirtualBox</li>
                            <li>Network Security</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

function Projects() {
    const project_list = [
        {
            name: "AgriLens.AI",
            date: "2023",
            link: "https://github.com/manishghoshal99/AgriLens.AI",
            description: [
                "AI-powered agricultural disease detection system using computer vision and machine learning.",
            ],
            domains: ["python", "machine-learning", "computer-vision"]
        },
        {
            name: "Stock Market Prediction",
            date: "2023",
            link: "https://github.com/manishghoshal99/Stock-Market-Prediction-Using-Numerical-And-Textual-Analysis",
            description: [
                "Stock market prediction using numerical and textual analysis with machine learning algorithms.",
            ],
            domains: ["python", "machine-learning", "data-analysis"]
        },
        {
            name: "Stockio CB",
            date: "2023",
            link: "https://github.com/manishghoshal99/Stockio_CB",
            description: [
                "A cryptocurrency trading platform with real-time data analysis and visualization.",
            ],
            domains: ["python", "blockchain", "data-visualization"]
        },
        {
            name: "Zelda Pygame",
            date: "2022",
            link: "https://github.com/manishghoshal99/Zelda-Pygame",
            description: [
                "A Zelda-inspired game developed using Pygame with custom graphics and game mechanics.",
            ],
            domains: ["python", "pygame", "game-development"]
        },
        {
            name: "Ubuntu Portfolio",
            date: "2024",
            link: "https://github.com/manishghoshal99/mgfolio",
            description: [
                "Personal portfolio website with Ubuntu theme, built using Next.js and Tailwind CSS.",
            ],
            domains: ["javascript", "next.js", "tailwindcss"]
        }
    ];

    const tag_colors = {
        "javascript": "yellow-300",
        "firebase": "red-600",
        "firestore": "red-500",
        "firebase auth": "red-400",
        "chrome-extension": "yellow-400",
        "flutter": "blue-400",
        "dart": "blue-500",
        "react-native": "purple-500",
        "html5": "pink-600",
        "sass": "pink-400",
        "tensorflow": "yellow-600",
        "django": "green-600",
        "python": "green-200",
        "codeforces-api": "gray-300",
        "tailwindcss": "blue-300",
        "next.js": "purple-600",
        "machine-learning": "yellow-500",
        "computer-vision": "blue-400",
        "data-analysis": "green-400",
        "blockchain": "yellow-600",
        "data-visualization": "purple-400",
        "pygame": "green-300",
        "game-development": "red-500"
    }

    return (
        <>
            <div className=" font-medium relative text-2xl mt-2 md:mt-4 mb-4">
                Projects
                <div className="absolute pt-px bg-white mt-px top-full w-full">
                    <div className="bg-white absolute rounded-full p-0.5 md:p-1 top-0 transform -translate-y-1/2 left-full"></div>
                    <div className="bg-white absolute rounded-full p-0.5 md:p-1 top-0 transform -translate-y-1/2 right-full"></div>
                </div>
            </div>
            <iframe src="https://github.com/sponsors/manishghoshal99/card" title="Sponsor manishghoshal99" className='my-4 w-5/6 md:w-3/4' ></iframe>

            {
                project_list.map((project, index) => {
                    const projectNameFromLink = project.link.split('/')
                    const projectName = projectNameFromLink[projectNameFromLink.length - 1]
                    return (
                        <a key={index} href={project.link} target="_blank" rel="noreferrer" className="flex w-full flex-col px-4">
                            <div className="w-full py-1 px-2 my-2 border border-gray-50 border-opacity-10 rounded hover:bg-gray-50 hover:bg-opacity-5 cursor-pointer">
                                <div className="flex flex-wrap justify-between items-center">
                                    <div className='flex justify-center items-center'>
                                        <div className=" text-base md:text-lg mr-2">{project.name.toLowerCase()}</div>
                                        <iframe src={`https://ghbtns.com/github-btn.html?user=manishghoshal99&repo=${projectName}&type=star&count=true`} frameBorder="0" scrolling="0" width="150" height="20" title={project.name.toLowerCase()+"-star"}></iframe>
                                    </div>
                                    <div className="text-gray-300 font-light text-sm">{project.date}</div>
                                </div>
                                <ul className=" tracking-normal leading-tight text-sm font-light ml-4 mt-1">
                                    {
                                        project.description.map((desc, index) => {
                                            return <li key={index} className="list-disc mt-1 text-gray-100">{desc}</li>;
                                        })
                                    }
                                </ul>
                                <div className="flex flex-wrap items-start justify-start text-xs py-2">
                                    {
                                        (project.domains ?
                                            project.domains.map((domain, index) => {
                                                return <span key={index} className={`px-1.5 py-0.5 w-max border border-${tag_colors[domain]} text-${tag_colors[domain]} m-1 rounded-full`}>{domain}</span>
                                            })

                                            : null)
                                    }
                                </div>
                            </div>
                        </a>
                    )
                })
            }
        </>
    )
}

const Resume = () => {
    return (
        <div className="flex-grow flex flex-col items-center justify-start overflow-y-auto p-4 w-full h-full">
            <div className="w-full max-w-4xl flex flex-col h-full">
                <h2 className="text-2xl font-bold mb-6 text-ubt-gedit-blue">Resume</h2>
                <div className="bg-ub-gedit-light bg-opacity-50 p-4 rounded-lg mb-4">
                    <a 
                        href="/files/ManishG_CV.pdf" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-4 py-2 bg-ubt-gedit-blue text-white rounded hover:bg-opacity-80 transition-colors"
                    >
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                        Download Resume
                    </a>
                </div>
                <div className="flex-grow w-full bg-ub-gedit-light bg-opacity-50 rounded-lg overflow-hidden">
                    <iframe 
                        src="/files/ManishG_CV.pdf" 
                        title="Manish Ghoshal Resume"
                        className="w-full h-full border-none"
                        style={{ minHeight: "calc(100vh - 200px)" }}
                    />
                </div>
            </div>
        </div>
    );
} 