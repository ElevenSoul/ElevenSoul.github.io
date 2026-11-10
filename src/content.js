// Everything written on the site lives in this one file.
// Change the words here and the site updates.

import menu1 from './assets/menu-1.webp'
import menu2 from './assets/menu-2.webp'
import menu3 from './assets/menu-3.webp'
import menu6 from './assets/menu-6.webp'

export const me = {
  name: 'Eleven',
  age: 'Twenty',
  from: 'Oman',
  tagline: 'I make the things I wish existed.',
  // The big paragraph in the About scene.
  about:
    'I am Eleven. I am twenty, I live in Oman, and I taught myself to build by building. Most of what I make starts as a small wish: a menu that should feel better, a page that should look like a painting, a bot that should just do the thing. Then I stay up until it exists.',
  instruments: ['Lua', 'JavaScript', 'React', 'HTML & CSS', 'Node.js'],
  // Leave a link empty ('') to hide its button.
  links: {
    github: 'https://github.com/ElevenSoul',
    discord: '', // your Discord username, for example 'eleven'
    email: '',
  },
}

// The marquee band under the hero.
export const marquee = ['FiveM scripts', 'Websites', 'Discord bots', 'Interfaces', 'Small tools', 'Whatever feels right']

// The gallery. `art` picks the picture inside the frame:
//   'photos' shows the images listed in `images` (they crossfade)
//   'enso', 'constellation' and 'waves' are drawn by the site itself
export const works = [
  {
    title: 'Eleven Menu',
    medium: 'Lua, HTML, CSS, JavaScript',
    year: '2026',
    kind: 'FiveM script',
    text: 'A staff menu for FiveM servers. Standalone, written from scratch, with an in-game permission manager and a player database that edits money, jobs, items and vehicles for online and offline characters.',
    art: 'photos',
    images: [menu1, menu2, menu3, menu6],
    link: '',
  },
  {
    title: 'Yugen',
    medium: 'JavaScript',
    year: '2026',
    kind: 'Open source',
    text: 'Named after the Japanese word for a beauty that is felt more than seen. The code is open on my GitHub.',
    art: 'enso',
    link: 'https://github.com/ElevenSoul/Yugen',
  },
  {
    title: 'Discord bots',
    medium: 'Node.js',
    year: 'Ongoing',
    kind: 'Made to order',
    text: 'Bots that run a community quietly in the background: moderation, tickets, roles, and the odd strange request.',
    art: 'constellation',
    link: '',
  },
  {
    title: 'Websites',
    medium: 'React, Framer Motion',
    year: 'Ongoing',
    kind: 'Made to order',
    text: 'Pages that move like this one. Built by hand, fast on a phone, and never from a template.',
    art: 'waves',
    link: '',
  },
]

export const repertoire = [
  {
    title: 'FiveM scripts',
    text: 'Standalone resources, ESX, QBCore and Qbox. Clean NUI interfaces that players and staff actually enjoy opening.',
    notes: ['Lua', 'NUI', 'oxmysql'],
  },
  {
    title: 'Websites',
    text: 'Portfolios, landing pages and server sites with real motion and real typography.',
    notes: ['React', 'Framer Motion', 'CSS'],
  },
  {
    title: 'Discord bots',
    text: 'Custom bots shaped around one community instead of a thousand generic commands.',
    notes: ['Node.js', 'discord.js'],
  },
  {
    title: 'Whatever feels right',
    text: 'Small tools, odd ideas, late experiments. If it sounds fun I will probably try it.',
    notes: ['Curiosity'],
  },
]
