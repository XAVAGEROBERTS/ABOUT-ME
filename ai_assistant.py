from flask import Flask, request, jsonify
from flask_cors import CORS
import random
from datetime import datetime

app = Flask(__name__)
CORS(app)

knowledge_base = {
    "personal_info": {
        "name": "Kenyi Robert Waya",
        "short_name": "Robert",
        "pronouns": {
            "subject": "he",
            "object": "him",
            "possessive": "his",
            "reflexive": "himself"
        },
        "profession": "Computer & Software Engineer",
        "specialization": "Full-Stack Development & Embedded Systems",
        "location": {
            "city": "Kampala",
            "country": "Uganda",
            "timezone": "EAT (UTC+3)",
            "coordinates": "0.3136° N, 32.5811° E"
        },
        "languages": ["English (Fluent)", "Swahili (Intermediate)", "Luganda (Basic)"],
        "professional_summary": (
            "Innovative computer engineer with expertise in full-stack web development "
            "and embedded systems. Passionate about creating efficient software solutions "
            "and bridging the gap between hardware and software."
        ),
        "detailed_introduction": (
            "Robert is a skilled Computer and Software Engineer from ISBAT University Kampala. "
            "With a strong background in both software development and computer engineering, "
            "he specializes in building full-stack applications and embedded systems. "
            "His technical expertise spans across multiple programming languages and frameworks, "
            "with particular strengths in JavaScript, Python, and IoT technologies. "
            "Robert holds a Bachelor's degree in Computer Engineering and has professional "
            "experience in both software development and IT support roles. "
            "He is known for his problem-solving skills and ability to create technical solutions "
            "that address real-world challenges across various industries."
        ),
        "hobbies": [
            "Open source contributions",
            "Mentoring junior developers",
            "Building IoT devices",
            "Technical blogging",
            "Participating in hackathons"
        ]
    },
    "education": {
        "degree": "Bachelor of Science in Computer Engineering",
        "university": "ISBAT University, Kampala",
        "duration": "2025-2029",
        "gpa": "3.8/4.0",
        "achievements": [
            "Graduated with First Class Honors",
            "Specialized in Computer Architecture",
            "Recipient of Academic Excellence Scholarship",
            "Published research paper on IoT in Agriculture"
        ],
        "courses": [
            "Advanced Algorithms", 
            "Machine Learning", 
            "Embedded Systems",
            "Computer Networks",
            "Database Systems",
            "Operating Systems",
            "Digital Signal Processing",
            "Artificial Intelligence",
            "Cloud Computing"
        ],
        "secondary_education": {
            "school": "St. Mary's College Kisubi",
            "duration": "2019-2024",
            "curriculum": "Uganda Advanced Certificate of Education",
            "achievements": [
                "Best Computing Student Award",
                "National Science Fair Finalist",
                "Mathematics Olympiad Winner"
            ]
        }
    },
    "skills": {
        "Programming Languages": ["JavaScript (ES6+)", "Python", "Java", "C/C++", "Rust", "Go"],
        "Web Development": ["React.js", "Node.js", "Express", "Django", "Flask", "HTML5/CSS3", "WebSockets"],
        "Mobile Development": ["React Native", "Flutter", "Android Development"],
        "Database": ["SQL", "MongoDB", "PostgreSQL", "Firebase", "Redis"],
        "DevOps & Cloud": ["Docker", "Kubernetes", "AWS", "Azure", "Linux Administration", "CI/CD Pipelines"],
        "Hardware": ["Embedded Systems", "IoT", "Arduino", "Raspberry Pi", "PCB Design", "Sensor Networks"],
        "Data Science": ["Pandas", "NumPy", "TensorFlow", "Data Visualization", "Scikit-learn"],
        "Security": ["OAuth", "JWT", "SSL/TLS", "Penetration Testing Basics"],
        "Other": ["Git", "Agile Methodologies", "Technical Writing", "UI/UX Principles"]
    },
    "experience": [
        {
            "role": "Software Development Intern",
            "company": "Tech Solutions Uganda",
            "location": "Kampala, Uganda",
            "period": "June 2023 - December 2023",
            "responsibilities": [
                "Developed and maintained web applications using MERN stack",
                "Implemented RESTful APIs with Node.js and Express",
                "Optimized application performance, reducing load times by 30%",
                "Collaborated with team using Git version control",
                "Participated in code reviews and sprint planning"
            ],
            "achievements": [
                "Reduced server costs by 25% through AWS optimization",
                "Implemented CI/CD pipeline reducing deployment time by 40%",
                "Mentored 2 junior interns on JavaScript best practices"
            ],
            "technologies": ["JavaScript", "React", "Node.js", "MongoDB", "AWS"]
        },
        {
            "role": "IT Support Specialist (Freelance)",
            "company": "Various SMEs",
            "location": "Kampala, Uganda",
            "period": "January 2021 - May 2023",
            "responsibilities": [
                "Provided technical support for hardware and software issues",
                "Set up and maintained computer networks for small businesses",
                "Conducted staff training on productivity software",
                "Performed system upgrades and data migrations",
                "Implemented basic cybersecurity measures"
            ],
            "achievements": [
                "Resolved 100+ technical issues with 95% satisfaction rate",
                "Improved system reliability by 40% for clients",
                "Reduced IT downtime by 60% for 5 client businesses"
            ],
            "technologies": ["Windows Server", "Linux", "Networking", "Hardware Troubleshooting"]
        }
    ],
    "projects": [
        {
            "name": "Smart Agriculture IoT System",
            "description": "An IoT-based solution for monitoring farm conditions with real-time data analytics and automated reporting",
            "tech": ["Python", "Django", "Raspberry Pi", "Sensor Networks", "Data Visualization"],
            "impact": "Implemented at 3 local farms, increasing yield by 15% and reducing water usage by 20%",
            "github": "https://github.com/username/smart-agri",
            "features": [
                "Real-time soil moisture monitoring",
                "Automated irrigation control",
                "Crop health prediction model",
                "Farmer mobile interface"
            ]
        },
        {
            "name": "E-Commerce Platform",
            "description": "Full-stack e-commerce solution with payment integration and admin dashboard",
            "tech": ["React", "Node.js", "MongoDB", "Stripe API", "Redux"],
            "impact": "Increased client sales by 25% and reduced cart abandonment by 30%",
            "github": "https://github.com/username/ecommerce-platform",
            "features": [
                "Product catalog with filters",
                "User authentication system",
                "Payment gateway integration",
                "Order tracking system"
            ]
        },
        {
            "name": "Student Management System",
            "description": "School administration system with attendance tracking, performance analytics, and parent portal",
            "tech": ["Python", "Django", "PostgreSQL", "Bootstrap"],
            "impact": "Adopted by 3 schools in Kampala, reducing administrative workload by 35%",
            "github": "https://github.com/username/student-mgmt",
            "features": [
                "Automated report generation",
                "Attendance tracking via biometrics",
                "Performance trend analysis",
                "Parent-teacher communication portal"
            ]
        }
    ],
    "certifications": [
        {
            "name": "AWS Certified Cloud Practitioner",
            "issuer": "Amazon Web Services",
            "year": "2023"
        },
        {
            "name": "Microsoft Certified: Azure Fundamentals",
            "issuer": "Microsoft",
            "year": "2022"
        },
        {
            "name": "Google Data Analytics Professional Certificate",
            "issuer": "Google",
            "year": "2022"
        },
        {
            "name": "Cisco Networking Academy Certificate",
            "issuer": "Cisco",
            "year": "2021"
        }
    ],
    "publications": [
        {
            "title": "IoT Applications in Precision Agriculture: A Case Study of Small-Scale Farms in Uganda",
            "conference": "African Conference on Computer Engineering",
            "year": "2023"
        },
        {
            "title": "Optimizing Resource Usage in Cloud-Native Applications",
            "journal": "Journal of African Technology",
            "year": "2022"
        }
    ],
    "contact": {
        "email": "robertmayhemj@gmail.com",
        "phone": "+256 765 673 373",
        "address": "P.O. Box 12345, Kampala, Uganda",
        "availability": "Available for freelance projects and full-time opportunities",
        "social": {
            "github": "https://github.com/yourusername",
            "linkedin": "https://linkedin.com/in/yourprofile",
            "twitter": "https://twitter.com/yourhandle",
            "portfolio": "https://robertwaya.tech"
        }
    }
}

def normalize_question(question, pronouns, name, short_name):
    """Replace pronouns with names to standardize question processing"""
    question = question.lower()
    
    replacements = {
        f"{pronouns['possessive']} ": f"{short_name}'s ",
        f"{pronouns['subject']} ": f"{short_name} ",
        f"{pronouns['object']} ": f"{short_name} ",
        "who is he": f"who is {short_name}",
        "who's he": f"who is {short_name}",
        "define him": f"define {short_name}",
        "tell me about him": f"tell me about {short_name}"
    }
    
    for original, replacement in replacements.items():
        question = question.replace(original, replacement)
    
    return question

def get_response(question):
    question = question.lower().strip()
    pronouns = knowledge_base['personal_info']['pronouns']
    name = knowledge_base['personal_info']['name']
    short_name = knowledge_base['personal_info']['short_name']
    
    # Normalize the question by replacing pronouns with names
    processed_question = normalize_question(question, pronouns, name, short_name)
    
    # Personal Definition
    if any(processed_question == variant for variant in [
        f"who is {short_name}",
        f"who is {short_name.lower()}",
        f"define {short_name}",
        f"describe {short_name}",
        f"tell me about {short_name}"
    ]):
        return (
            f"{knowledge_base['personal_info']['detailed_introduction']}\n\n"
            f"Key Facts:\n"
            f"- Full Name: {name}\n"
            f"- Profession: {knowledge_base['personal_info']['profession']}\n"
            f"- Specialization: {knowledge_base['personal_info']['specialization']}\n"
            f"- Location: {knowledge_base['personal_info']['location']['city']}, "
            f"{knowledge_base['personal_info']['location']['country']}\n"
            f"- Education: {knowledge_base['education']['degree']} from {knowledge_base['education']['university']}\n"
            f"- Languages: {', '.join(knowledge_base['personal_info']['languages'])}\n"
            f"- Hobbies: {', '.join(knowledge_base['personal_info']['hobbies'])}"
        )
    
    # Greetings
    if any(word in processed_question for word in ["hi", "hello", "hey"]):
        return random.choice([
            f"Hello! I'm {name}'s AI assistant. How can I help?",
            f"Hi there! Ask me about {short_name}'s professional background.",
            f"Greetings! I can tell you about {short_name}'s skills and projects."
        ])
    
    # Goodbye
    if any(word in processed_question for word in ["bye", "goodbye", "exit"]):
        return random.choice([
            "Goodbye! Feel free to return with more questions.",
            "See you later!",
            f"Have a great day! {short_name} is available for contact if you have further questions."
        ])
    
    # Thanks
    if any(word in processed_question for word in ["thank", "thanks", "appreciate"]):
        return random.choice([
            "You're welcome!",
            "Happy to help!",
            f"Glad I could assist! {short_name} is always happy to share his knowledge."
        ])
    
    # Personal Information
    if any(word in processed_question for word in ["name", "who are you"]):
        return (
            f"I'm {name}, "
            f"a {knowledge_base['personal_info']['profession']} specializing in "
            f"{knowledge_base['personal_info']['specialization']}. "
            f"You can ask me about {pronouns['possessive']} professional background, skills, or projects."
        )
    
    # Location
    if any(word in processed_question for word in ["location", "where", "live", "based", "city", "country"]):
        loc = knowledge_base['personal_info']['location']
        return (
            f"{name} is based in {loc['city']}, {loc['country']} "
            f"(Timezone: {loc['timezone']}, Coordinates: {loc['coordinates']}). "
            f"{pronouns['subject'].title()} is available for remote work and local opportunities."
        )
    
    # Professional Background
    if any(word in processed_question for word in ["professional", "background", "summary", "overview"]):
        return (
            f"Professional Background:\n"
            f"- Name: {name}\n"
            f"- Profession: {knowledge_base['personal_info']['profession']}\n"
            f"- Specialization: {knowledge_base['personal_info']['specialization']}\n"
            f"- Location: {knowledge_base['personal_info']['location']['city']}, "
            f"{knowledge_base['personal_info']['location']['country']}\n"
            f"- Languages: {', '.join(knowledge_base['personal_info']['languages'])}\n"
            f"- Years of Experience: {len(knowledge_base['experience'])}+\n\n"
            f"Professional Summary:\n{knowledge_base['personal_info']['professional_summary']}"
        )
    
    # Education
    if any(word in processed_question for word in ["education", "degree", "study", "university", "school"]):
        edu = knowledge_base["education"]
        sec_edu = edu["secondary_education"]
        return (
            f"Education Background:\n\n"
            f"University Education:\n"
            f"- Degree: {edu['degree']}\n"
            f"- University: {edu['university']}\n"
            f"- Duration: {edu['duration']}\n"
            f"- GPA: {edu['gpa']}\n"
            f"- Key Achievements:\n  • " + "\n  • ".join(edu['achievements']) + "\n"
            f"- Major Courses:\n  • " + "\n  • ".join(edu['courses']) + "\n\n"
            f"Secondary Education:\n"
            f"- School: {sec_edu['school']}\n"
            f"- Duration: {sec_edu['duration']}\n"
            f"- Curriculum: {sec_edu['curriculum']}\n"
            f"- Achievements:\n  • " + "\n  • ".join(sec_edu['achievements'])
        )
    
    # Skills
    if any(word in processed_question for word in ["skill", "skills", "ability", "expertise"]):
        response = "Technical Skills:\n"
        for category, skills in knowledge_base["skills"].items():
            response += f"\n- {category}:\n  • " + "\n  • ".join(skills)
        
        # Add skill proficiency levels if asked
        if "level" in processed_question or "proficient" in processed_question:
            response += "\n\nSkill Levels:\n- Advanced: JavaScript, Python, React\n- Intermediate: Java, C/C++, AWS\n- Basic: Rust, Go, TensorFlow"
        
        return response
    
    # Experience
    if any(word in processed_question for word in ["experience", "job", "career", "work history"]):
        response = "Professional Experience:\n\n"
        for exp in knowledge_base["experience"]:
            response += (
                f"{exp['role']} at {exp['company']} ({exp['period']})\n"
                f"Location: {exp['location']}\n"
                f"Technologies: {', '.join(exp['technologies'])}\n"
                f"Responsibilities:\n  • " + "\n  • ".join(exp['responsibilities']) + "\n"
                f"Achievements:\n  • " + "\n  • ".join(exp['achievements']) + "\n\n"
            )
        return response.strip()
    
    # Projects
    if any(word in processed_question for word in ["project", "projects", "work", "portfolio"]):
        response = "Notable Projects:\n\n"
        for project in knowledge_base["projects"]:
            response += (
                f"{project['name']}\n"
                f"- Description: {project['description']}\n"
                f"- Technologies: {', '.join(project['tech'])}\n"
                f"- Key Features:\n  • " + "\n  • ".join(project['features']) + "\n"
                f"- Impact: {project['impact']}\n"
                f"- GitHub: {project.get('github', 'Available upon request')}\n\n"
            )
        return response.strip()
    
    # Certifications
    if any(word in processed_question for word in ["certification", "certifications", "certificate"]):
        response = "Professional Certifications:\n"
        for cert in knowledge_base["certifications"]:
            response += f"\n- {cert['name']} ({cert['issuer']}, {cert['year']})"
        return response
    
    # Publications
    if any(word in processed_question for word in ["publication", "publications", "paper", "research"]):
        response = "Publications:\n"
        for pub in knowledge_base["publications"]:
            if "conference" in pub:
                response += f"\n- {pub['title']} ({pub['conference']}, {pub['year']})"
            else:
                response += f"\n- {pub['title']} ({pub['journal']}, {pub['year']})"
        return response
    
    # Hobbies
    if any(word in processed_question for word in ["hobby", "hobbies", "interest", "interests"]):
        return (
            f"{name}'s hobbies and interests include:\n"
            f"- " + "\n- ".join(knowledge_base['personal_info']['hobbies'])
        )
    
    # Contact
    if any(word in processed_question for word in ["contact", "email", "phone", "reach", "social media", "hire"]):
        contact = knowledge_base["contact"]
        return (
            f"Contact Information:\n"
            f"- Email: {contact['email']}\n"
            f"- Phone: {contact['phone']}\n"
            f"- Address: {contact['address']}\n"
            f"- Availability: {contact['availability']}\n\n"
            f"Social Media:\n"
            f"- GitHub: {contact['social']['github']}\n"
            f"- LinkedIn: {contact['social']['linkedin']}\n"
            f"- Twitter: {contact['social']['twitter']}\n"
            f"- Portfolio: {contact['social']['portfolio']}"
        )
    
    # Default response
    return random.choice([
        f"I can tell you about {name}'s professional background, skills, education, projects and experience.",
        f"What would you like to know about {short_name}'s work? I can discuss {pronouns['possessive']} skills, projects, or experience.",
        f"Ask me about {short_name}'s education, skills, or professional experience. You can also ask about {pronouns['possessive']} publications or certifications."
    ])

@app.route('/ask', methods=['POST'])
def ask_ai():
    data = request.json
    question = data.get('question', '').strip()
    
    if not question:
        return jsonify({"response": "Please ask a question."})
    
    response = get_response(question)
    
    return jsonify({
        "response": response,
        "timestamp": datetime.now().isoformat()
    })

if __name__ == '__main__':
    app.run(debug=True, port=5000)