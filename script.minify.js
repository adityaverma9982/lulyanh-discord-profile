const userID="497010169704742912",statusImage=document.getElementById("status-image"),discordUsername=document.getElementById("discord-username"),discordDiscrim=document.getElementById("discord-discriminator"),discordUserState=document.getElementById("user-status"),discordUserAvatar=document.getElementById("user-avatar"),discordUserBanner=document.getElementById("user-banner");async function fetchDiscordStatus(){try{const s=await axios.get(`https://api.lanyard.rest/v1/users/${userID}`),{data:t}=s.data,{discord_user:e,discord_status:a,activities:r}=t;let d;switch(a){case"online":d="/public/status/online.svg";break;case"idle":d="/public/status/idle.svg";break;case"dnd":d="/public/status/dnd.svg";break;case"offline":d="/public/status/offline.svg";break;default:d=""}r.find((s=>1===s.type&&s.url.includes("twitch.tv")))&&(d="/public/status/streaming.svg"),discordUsername.innerHTML=e.username,discordDiscrim.innerHTML=`#${e.discriminator}`,r.find((s=>4===s.type))&&(discordUserState.innerHTML=r[0].state,discordUserState.style.display="block");const i=await axios.get(`https://discordlookup.mesavirep.xyz/v1/user/${userID}`),{avatar:c,banner:n}=i.data;null===c.id&&(discordUserAvatar.src="https://cdn.discordapp.com/embed/avatars/0.png"),!0===c.is_animated?discordUserAvatar.src=`https://cdn.discordapp.com/avatars/${userID}/${e.avatar}.gif?size=1024`:discordUserAvatar.src=`https://cdn.discordapp.com/avatars/${userID}/${e.avatar}.png?size=1024`,null===n.id&&(discordUserBanner.src="/public/banner.webp"),!0===n.is_animated?discordUserBanner.src=`https://cdn.discordapp.com/banners/${userID}/${n.id}.gif?size=1024`:discordUserBanner.src=`https://cdn.discordapp.com/banners/${userID}/${n.id}.png?size=1024`,statusImage.src=d,statusImage.alt=`Discord status: ${a}`}catch(s){console.error("Unable to retrieve Discord status:",s)}}fetchDiscordStatus(),setInterval(fetchDiscordStatus,5e3),$((function(){$('[data-toggle="tooltip"]').tooltip()}));