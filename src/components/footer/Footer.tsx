import { DiscordLogo, FacebookLogo, InstagramLogo, LinkedinLogo } from '@phosphor-icons/react'
import { GithubLogo, GitlabLogoSimple } from '@phosphor-icons/react/dist/ssr'

function Footer() {

    let data = new Date().getFullYear()

    return (
        <>
            <div className="flex justify-center bg-indigo-900 text-white">
                <div className="container flex flex-col items-center py-4">
                    <p className='text-xl font-bold'>
                            Blog Pessoal Generation | Copyright: {data}
                        </p>
                    <p className='text-lg'>Acesse as minhas redes sociais</p>
                    <div className='flex gap-2'>
                        <a href="https://www.linkedin.com/in/lucas-daniel-souza-dias/" target="_blank" rel="noopener noreferrer"><LinkedinLogo size={48} weight='bold' /></a>
                        <a href="https://github.com/Lucas300" target="_blank"><GithubLogo size={48} weight='bold' /></a>
                        <a href="https://www.instagram.com/lucas.kardashiann/" target="_blank" rel="noopener noreferrer"><InstagramLogo size={48} weight='bold' /></a>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Footer