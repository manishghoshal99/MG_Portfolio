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
            <div className="w-20 md:w-28 my-4 bg-white rounded-full">
                <img className="w-full" src="./images/logos/bitmoji.png" alt="Manish Ghoshal Logo" />
            </div>
            <div className=" mt-4 md:mt-8 text-lg md:text-2xl text-center px-1">
                <div>my name is <span className="font-bold">Manish Ghoshal</span> ,</div>
                <div className="font-normal ml-1">I'm a <span className="text-pink-600 font-bold">Software Developer!</span></div>
            </div>
            <div className=" mt-4 relative md:my-8 pt-px bg-white w-32 md:w-48">
                <div className="bg-white absolute rounded-full p-0.5 md:p-1 top-0 transform -translate-y-1/2 left-0"></div>
                <div className="bg-white absolute rounded-full p-0.5 md:p-1 top-0 transform -translate-y-1/2 right-0"></div>
            </div>
            <ul className=" mt-4 leading-tight tracking-tight text-sm md:text-base w-5/6 md:w-3/4 emoji-list">
                <li className=" list-pc">I'm a <span className=" font-medium">Software Developer</span> with a passion for creating efficient and scalable applications. I specialize in full-stack development and have experience with various technologies. ( Hit me up <a className='text-underline' href='mailto:manishghoshal99.py@gmail.com'><u>@manishghoshal99.py@gmail.com</u></a> :) )</li>
                <li className=" mt-3 list-building"> I enjoy building awesome software that solve practical problems.</li>
                <li className=" mt-3 list-time"> When I am not coding my next project, I like to spend my time reading books, playing games or exploring new technologies.</li>
                <li className=" mt-3 list-star"> And I also have interest in Machine Learning & Artificial Intelligence!</li>
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
                        <h3 className="text-xl font-semibold text-ubt-gedit-blue">Master of Science in Computer Science</h3>
                        <p className="text-gray-300">University of California, Riverside</p>
                        <p className="text-gray-400">2023 - 2025 (Expected)</p>
                        <ul className="list-disc list-inside mt-2 text-gray-300">
                            <li>GPA: 3.8/4.0</li>
                            <li>Relevant Coursework: Advanced Algorithms, Machine Learning, Distributed Systems</li>
                        </ul>
                    </div>
                    <div className="bg-ub-gedit-light bg-opacity-50 p-4 rounded-lg">
                        <h3 className="text-xl font-semibold text-ubt-gedit-blue">Bachelor of Technology in Computer Science</h3>
                        <p className="text-gray-300">SRM Institute of Science and Technology</p>
                        <p className="text-gray-400">2019 - 2023</p>
                        <ul className="list-disc list-inside mt-2 text-gray-300">
                            <li>GPA: 3.9/4.0</li>
                            <li>Relevant Coursework: Data Structures, Algorithms, Database Management, Operating Systems</li>
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
                            <li>JavaScript/TypeScript</li>
                            <li>C++</li>
                        </ul>
                    </div>
                    <div className="bg-ub-gedit-light bg-opacity-50 p-4 rounded-lg">
                        <h3 className="text-xl font-semibold text-ubt-gedit-blue mb-3">Web Technologies</h3>
                        <ul className="list-disc list-inside text-gray-300">
                            <li>React.js</li>
                            <li>Next.js</li>
                            <li>Node.js</li>
                            <li>HTML5/CSS3</li>
                        </ul>
                    </div>
                    <div className="bg-ub-gedit-light bg-opacity-50 p-4 rounded-lg">
                        <h3 className="text-xl font-semibold text-ubt-gedit-blue mb-3">Databases</h3>
                        <ul className="list-disc list-inside text-gray-300">
                            <li>MongoDB</li>
                            <li>PostgreSQL</li>
                            <li>MySQL</li>
                        </ul>
                    </div>
                    <div className="bg-ub-gedit-light bg-opacity-50 p-4 rounded-lg">
                        <h3 className="text-xl font-semibold text-ubt-gedit-blue mb-3">Tools & Technologies</h3>
                        <ul className="list-disc list-inside text-gray-300">
                            <li>Git/GitHub</li>
                            <li>Docker</li>
                            <li>AWS</li>
                            <li>Linux</li>
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