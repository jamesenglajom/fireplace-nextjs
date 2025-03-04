import { Redis } from "@upstash/redis";

export const redis = new Redis({
  url: process.env.NEXT_UPSTASH_REDIS_REST_URL,
  token: process.env.NEXT_UPSTASH_REDIS_REST_TOKEN,
});


export const keys = {
  menu_lists:{
    description: "used to retreive list of menu keys.",
    value: "solana_menu_list",
  },
  default_menu:{
    description:"default menu",
    value:"menu-vwmuqu8jz",
  },
  active_menu:{
    description: "used to retreive the key of the active or currently used menu.",
    value: "solana_active_menu",
  },
  logo:{
    description: "used to retreive image_url of the logo",
    value: "solana_log"
  }
}


export const redisSet = async(key, value) => {
  try{
    const response = await fetch("/api/redis", {
      cache:"no-store",
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ key, value }),
    });
    return await response.json();
  }catch(error){
    console.log(`RedisGetError: ${error}`);
  }
}

export const redisGet = async(key) =>{
  try {
    const params = new URLSearchParams({key:key});
    // throw new Error(`RedisGetTest ${key}: ${params}`);
    const response = await fetch(`/api/redis?key=${key}`,{
      cache:"no-store",
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`RedisGetError ${response.status}: ${errorData.error}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`RedisGetError: ${error}`);
  }
}