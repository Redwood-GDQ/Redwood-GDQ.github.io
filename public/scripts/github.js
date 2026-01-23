async function fetchGithubMembers() {
    const orgName = 'Redwood-GDQ';
    const teamContainer = document.getElementById('github-team');

    try {
        const response = await fetch(`https://api.github.com/orgs/${orgName}/members`);
        
        if (!response.ok) throw new Error('Falha ao invocar os membros');

        const members = await response.json();
        console.log(members)

        if (members.length == 0) throw new Error('Lista de membros vazia');
     
        teamContainer.innerHTML = '';

        members.forEach(member => {
            
            const memberCard = `
                <div class="card-member">
                    <img src="${member.avatar_url}" alt="${member.login}" class="avatar">
                    <p class="member-name">${member.login}</p>
                    <a href="${member.html_url}" target="_blank" class="cta-button" 
                       style="padding: 5px 10px; font-size: 0.5rem; margin-top: 10px; display: inline-block;">
                       PERFIL
                    </a>
                </div>
            `;
            teamContainer.innerHTML += memberCard;
        });

    } catch (error) {
        teamContainer.innerHTML = `<p style="color: white;">A maldição impediu a conexão...</p>`;
    }
}

window.onload = fetchGithubMembers;