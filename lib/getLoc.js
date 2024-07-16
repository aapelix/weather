export default async function getLocation() {
  try {
    // Fetch the public IP address
    const res = await fetch("http://ip-api.com/json/");
    const loc = await res.json();

    return loc;
  } catch (error) {
    console.error("Error getting location:", error);
    return null;
  }
}
