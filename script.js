// Cursor Glow Effect
const cursorGlow = document.getElementById('cursorGlow');
let mouseX = 0, mouseY = 0, glowX = 0, glowY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function animateGlow() {
    glowX += (mouseX - glowX) * 0.1;
    glowY += (mouseY - glowY) * 0.1;
    cursorGlow.style.left = glowX + 'px';
    cursorGlow.style.top = glowY + 'px';
    requestAnimationFrame(animateGlow);
}
animateGlow();


window.addEventListener('scroll', () => {
    const nav = document.getElementById('navbar');
    if (window.scrollY > 100) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
});


function loadProjects() {
    const grid = document.getElementById('projectsGrid');
    Object.values(PROJECTS_CONFIG).forEach(project => {
        const card = document.createElement('div');
        card.className = 'project-card';
        card.innerHTML = `
            <div class="project-image">${project.icon}</div>
            <div class="project-content">
                <h3 class="project-title">${project.title}</h3>
                <p class="project-description">${project.description}</p>
                <div class="project-tech">${project.technologies.map(t => `<span class="tech-tag">${t}</span>`).join('')}</div>
                <div class="project-links">
                    <a href="${project.githubLink}" target="_blank" class="project-link">GitHub</a>
                </div>
            </div>`;
        grid.appendChild(card);
    });
}
loadProjects();

document.getElementById('downloadResume').addEventListener('click', function(e) {
    e.preventDefault();
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    doc.text('SHIVAM CHANDEL RESUME', 20, 20);
    doc.save('Shivam_Chandel_Resume.pdf');
});



 

const resumeBtn = document.getElementById('downloadResume');

if (resumeBtn) {
    resumeBtn.addEventListener('click', function(e) {
        e.preventDefault();
        
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
      
        doc.setFillColor(30, 58, 138); // Professional Blue
        doc.rect(0, 0, 210, 40, 'F');
        
        doc.setFontSize(24);
        doc.setTextColor(255, 255, 255);
        doc.setFont(undefined, 'bold');
        doc.text('SHIVAM CHANDEL', 105, 20, { align: 'center' });
        
        doc.setFontSize(10);
        doc.setFont(undefined, 'normal');
        doc.text('Full Stack Developer | Bhopal, MP', 105, 30, { align: 'center' });

   
        let y = 55;
        doc.setTextColor(0, 0, 0);
        doc.setFontSize(14);
        doc.text('PROJECTS', 20, y);
        
        y += 10;
 
        Object.values(PROJECTS_CONFIG).forEach(project => {
            doc.setFontSize(11);
            doc.setFont(undefined, 'bold');
            doc.text(project.title, 20, y);
            
            doc.setFontSize(9);
            doc.setFont(undefined, 'normal');
            doc.text(project.pdfTech, 20, y + 5);
            
            y += 10;
            project.pdfBullets.forEach(bullet => {
                doc.text(bullet, 25, y);
                y += 5;
            });
            y += 5;
        });

        // --- Save PDF ---
        doc.save('Shivam_Chandel_Resume.pdf');
    });
}