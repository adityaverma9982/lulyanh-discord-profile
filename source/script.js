const userID = "1198144799937675347"; //put ur discord user id here.
const statusImage = document.getElementById("status-image");
const discordUserglobalName = document.getElementById("discord-userglobalname");
const discordUsername = document.getElementById("discord-username");
const discordDiscrim = document.getElementById("discord-discriminator");
const discordUserState = document.getElementById("user-status");
const discordUserAvatar = document.getElementById("user-avatar");
const discordUserBanner = document.getElementById("user-banner");

async function fetchDiscordStatus() {
  try {
    const response = await axios.get(
      `https://api.lanyard.rest/v1/users/${userID}`
    );
    const { data } = response.data;
    const { discord_user, discord_status, activities } = data;

    // Get the corresponding image path for the status.
    let imagePath;
    switch (discord_status) {
      case "online":
        imagePath = "/public/status/online.svg";
        break;
      case "idle":
        imagePath = "/public/status/idle.svg";
        break;
      case "dnd":
        imagePath = "/public/status/dnd.svg";
        break;
      case "offline":
        imagePath = "/public/status/offline.svg";
        break;
      default:
        imagePath = "";
        break;
    }

    // Check the active status to update the image path.
    if (
      activities.find(
        (activity) => activity.type === 1 && activity.url.includes("twitch.tv")
      )
    ) {
      imagePath = "/public/status/streaming.svg";
    }

    //Get user's username & discriminator
    if (discord_user.global_name === null) {
      discordUserglobalName.innerHTML = discord_user.username;
    } else {
      discordUserglobalName.innerHTML = discord_user.global_name;
    }

    discordUsername.innerHTML = discord_user.username;

    if (discord_user.discriminator == 0) {
      discordDiscrim.innerHTML = ` `;
    } else {
      discordDiscrim.innerHTML = `#${discord_user.discriminator}`;
    }

    document.title = `${discord_user.username}'s Profile`

    //Get user's status
    if (activities.find(
      (activity) => activity.type === 4
    )) {
      discordUserState.innerHTML = activities[0].state;
      discordUserState.style.display = "block";
    }

    //Get user's avatar & banner(if they have one)
    const discordLookup = await axios.get(`https://discordlookup.mesavirep.xyz/v1/user/${userID}`);

    const { avatar, banner } = discordLookup.data;

    if (avatar.id === null) {
      discordUserAvatar.src = "https://cdn.discordapp.com/embed/avatars/0.png";
    }

    if (avatar.is_animated === true) {
      discordUserAvatar.src = `https://cdn.discordapp.com/avatars/${userID}/${discord_user.avatar}.gif?size=1024`;
    } else {
      discordUserAvatar.src = `https://cdn.discordapp.com/avatars/${userID}/${discord_user.avatar}.png?size=1024`;
    }

    if (banner.id === null) {
      discordUserBanner.src = "/public/banner.jpg";
    } else if (banner.is_animated === true) {
      discordUserBanner.src = `https://cdn.discordapp.com/banners/${userID}/${banner.id}.gif?size=1024`;
    } else {
      discordUserBanner.src = `https://cdn.discordapp.com/banners/${userID}/${banner.id}.png?size=1024`;
    }

    statusImage.src = imagePath;
    statusImage.alt = `Discord status: ${discord_status}`;
  } catch (error) {
    console.error("Unable to retrieve Discord status:", error);
  }
}

fetchDiscordStatus();
setInterval(fetchDiscordStatus, 30000); // Update status every 30 seconds

$(function () {
  $('[data-toggle="tooltip"]').tooltip()
});
