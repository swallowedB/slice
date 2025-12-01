const DEFAULT_PROFILE_IMAGES= [
  "/images/avatar-1.svg",
  "/images/avatar-2.svg",
  "/images/avatar-3.svg",
]

export function getRandomProfile() {
  const random = Math.floor(Math.random() * DEFAULT_PROFILE_IMAGES.length);
  return DEFAULT_PROFILE_IMAGES[random]
}