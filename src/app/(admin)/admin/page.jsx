import React from 'react'
import {redis} from "@/app/lib/redis";
import CardWrap from '@/app/components/admin/CardWrap'
import LogoUpdater from '@/app/components/admin/LogoUpdater'
import MenuUpdater from "@/app/components/admin/MenuUpdater"
import ThemeUpdater from "@/app/components/admin/ThemeUpdater"

async function AdminIndexPage() {
  const logoRedisKey = "admin_solana_market_logo";
  const logo = await redis.get(logoRedisKey);
  return (
    <div className="px-2 flex flex-col gap-[20px] container mx-auto pb-5">
      <CardWrap>
        <LogoUpdater logo={logo}/>
      </CardWrap>
      {/*  */}
      <ThemeUpdater />
      <MenuUpdater />
    </div>
  )
}

export default AdminIndexPage