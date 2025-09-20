import React from 'react'

import config from '@/payload.config'
import './styles.css'

export default async function HomePage() {
  const payloadConfig = await config

  return (
    <div className="home">
      <div className="content">
        <h1>RecoveryRocks</h1>
        <div className="links">
          <a className="admin" href={process.env.APP_URL} rel="noopener noreferrer" target="_blank">
            Приложение
          </a>
          <a
            className="docs"
            href={payloadConfig.routes.admin}
            rel="noopener noreferrer"
            target="_blank"
          >
            Админ-панель
          </a>
        </div>
      </div>
    </div>
  )
}
