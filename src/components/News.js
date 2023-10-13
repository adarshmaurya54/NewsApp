import React, { Component } from 'react'
import NewsItem from './NewsItem'
import thumbnail from '../newspaper-cover-page.jpg'
import Loader from "./Loader";


export class News extends Component {

    constructor() {
        super();
        this.state = {
            loading: true,
            article: []
        }
    }
    sleep = (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    async componentDidMount() {
        const { searchTerm, category } = this.props;

        if (category) {
            // let articles = [
            //     {
            //         "source": {
            //             "id": null,
            //             "name": "Slashdot.org"
            //         },
            //         "author": "Adarsh",
            //         "title": "Microsoft Publishes Garbled AI Article Calling Tragically Deceased NBA Player 'Useless'",
            //         "description": "An anonymous reader shares a report: Former NBA player Brandon Hunter passed away unexpectedly at the young age of 42 this week, a tragedy that rattled fans of his 2000s career with the Boston Celtics and Orlando Magic. But in an unhinged twist on what was ot…",
            //         "url": "https://tech.slashdot.org/story/23/09/15/1050256/microsoft-publishes-garbled-ai-article-calling-tragically-deceased-nba-player-useless",
            //         "urlToImage": "https://a.fsdn.com/sd/topics/microsoft_64100.png",
            //         "publishedAt": "2023-09-15T14:00:00Z",
            //         "content": "Sign up for the Slashdot newsletter! OR check out the new Slashdot job board to browse remote jobs or jobs in your areaDo you develop on GitHub? You can keep using GitHub but automatically sync your … [+268 chars]"
            //     },
            // ]
            // this.setState({article: articles});
            // this.setState({searchTerm: category});
            // this.setState({ loading: false })
            let response = await fetch(`https://newsapi.org/v2/top-headlines?country=in&category=${category}&apiKey=${this.props.apiKey}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            let data = await response.json();
            this.setState({ article: data.articles })
            this.setState({ loading: false })

        } else if (searchTerm.trim() !== '') {
            try {
                let response = await fetch(`https://newsapi.org/v2/everything?q=${searchTerm}&apiKey=${this.props.apiKey}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                let data = await response.json();
                this.setState({ article: data.articles })
                this.setState({ loading: false })
                // setTimeout(() => {
                //     let articles = [
                //         {
                //             "source": {
                //                 "id": null,
                //                 "name": "Slashdot.org"
                //             },
                //             "author": "msmash",
                //             "title": "Microsoft Publishes Garbled AI Article Calling Tragically Deceased NBA Player 'Useless'",
                //             "description": "An anonymous reader shares a report: Former NBA player Brandon Hunter passed away unexpectedly at the young age of 42 this week, a tragedy that rattled fans of his 2000s career with the Boston Celtics and Orlando Magic. But in an unhinged twist on what was ot…",
                //             "url": "https://tech.slashdot.org/story/23/09/15/1050256/microsoft-publishes-garbled-ai-article-calling-tragically-deceased-nba-player-useless",
                //             "urlToImage": "https://a.fsdn.com/sd/topics/microsoft_64100.png",
                //             "publishedAt": "2023-09-15T14:00:00Z",
                //             "content": "Sign up for the Slashdot newsletter! OR check out the new Slashdot job board to browse remote jobs or jobs in your areaDo you develop on GitHub? You can keep using GitHub but automatically sync your … [+268 chars]"
                //         },
                //         {
                //             "source": {
                //                 "id": null,
                //                 "name": "Slashdot.org"
                //             },
                //             "author": "EditorDavid",
                //             "title": "Researchers Including Microsoft Spot Chinese Disinformation Campaign Using AI-Generated Photos",
                //             "description": "\"Until now, China's influence campaigns have been focused on amplifying propaganda defending its policies on Taiwan and other subjects,\" reports the New York Times. \n\nBut a new piece co-authored by the newspaper's national security correspondent and its misin…",
                //             "url": "https://slashdot.org/story/23/09/16/0131254/researchers-including-microsoft-spot-chinese-disinformation-campaign-using-ai-generated-photos",
                //             "urlToImage": "https://a.fsdn.com/sd/topics/china_64.png",
                //             "publishedAt": "2023-09-16T14:34:00Z",
                //             "content": "\"Until now, China's influence campaigns have been focused on amplifying propaganda defending its policies on Taiwan and other subjects,\" reports the New York Times.But a new piece co-authored by the … [+2947 chars]"
                //         },
                //         {
                //             "source": {
                //                 "id": null,
                //                 "name": "Slashdot.org"
                //             },
                //             "author": "EditorDavid",
                //             "title": "Microsoft Needs So Much Power to Train AI That It's Considering Small Nuclear Reactors",
                //             "description": "An anonymous reader shares this report from Futurism:\n\nTraining large language models is an incredibly power-intensive process that has an immense carbon footprint. Keeping data centers running requires a ludicrous amount of electricity that could generate su…",
                //             "url": "https://hardware.slashdot.org/story/23/09/30/2130220/microsoft-needs-so-much-power-to-train-ai-that-its-considering-small-nuclear-reactors",
                //             "urlToImage": "https://a.fsdn.com/sd/topics/power_64.png",
                //             "publishedAt": "2023-10-01T03:34:00Z",
                //             "content": "Training large language models is an incredibly power-intensive process that has an immense carbon footprint. Keeping data centers running requires a ludicrous amount of electricity that could genera… [+1202 chars]"
                //         },
                //         {
                //             "source": {
                //                 "id": null,
                //                 "name": "Slashdot.org"
                //             },
                //             "author": "EditorDavid",
                //             "title": "To Build Their AI Tech, Microsoft and Google are Using a Lot of Water",
                //             "description": "An anonymous Slashdot reader shares this report from the Associated Press:\n\nThe cost of building an artificial intelligence product like ChatGPT can be hard to measure. But one thing Microsoft-backed OpenAI needed for its technology was plenty of water, pulle…",
                //             "url": "https://news.slashdot.org/story/23/09/10/2033253/to-build-their-ai-tech-microsoft-and-google-are-using-a-lot-of-water",
                //             "urlToImage": "https://a.fsdn.com/sd/topics/ai_64.png",
                //             "publishedAt": "2023-09-10T20:59:00Z",
                //             "content": "The cost of building an artificial intelligence product like ChatGPT can be hard to measure. But one thing Microsoft-backed OpenAI needed for its technology was plenty of water, pulled from the water… [+1952 chars]"
                //         },
                //         {
                //             "source": {
                //                 "id": null,
                //                 "name": "Slashdot.org"
                //             },
                //             "author": "EditorDavid",
                //             "title": "How a Breached Microsoft Engineer Account Compromised the Email Accounts of US Officials",
                //             "description": "An anonymous reader shared this report from Bloomberg:\n\nChina-linked hackers breached the corporate account of a Microsoft engineer and are suspected of using that access to steal a valuable key that enabled the hack of senior U.S. officials' email accounts, …",
                //             "url": "https://it.slashdot.org/story/23/09/11/0116237/how-a-breached-microsoft-engineer-account-compromised-the-email-accounts-of-us-officials",
                //             "urlToImage": "https://a.fsdn.com/sd/topics/security_64.png",
                //             "publishedAt": "2023-09-11T01:44:00Z",
                //             "content": "We found that this crash dump, believed at the time not to contain key material, was subsequently moved from the isolated production network into our debugging environment on the internet connected c… [+659 chars]"
                //         },
                //         {
                //             "source": {
                //                 "id": "business-insider",
                //                 "name": "Business Insider"
                //             },
                //             "author": "Aaron Mok",
                //             "title": "Microsoft CEO Satya Nadella gets honest about Bing's chances against Google",
                //             "description": "CEO Satya Nadella said he is starting to doubt whether AI has a chance to transform online search.",
                //             "url": "https://www.businessinsider.com/microsoft-ceo-ai-not-enough-bing-beat-google-antitrust-2023-10",
                //             "urlToImage": "https://i.insider.com/651c7567617692f0d03e4916?width=1200&format=jpeg",
                //             "publishedAt": "2023-10-03T21:03:16Z",
                //             "content": "Satya Nadella thinks he has blown AI's revolutionary potential out of proportion.REUTERS/Eduardo Munoz\r\n<ul><li>Satya Nadella, CEO of Microsoft, said Google's dominance of online search is hurting Bi… [+2976 chars]"
                //         },
                //         {
                //             "source": {
                //                 "id": "business-insider",
                //                 "name": "Business Insider"
                //             },
                //             "author": "William Antonelli",
                //             "title": "Best Prime Day laptop deals: Save up to $800 on models from Acer, Asus, and Microsoft",
                //             "description": "Amazon's Prime Big Deal Days has arrived with tons of great deals on laptops, including top gaming models from Acer and Alienware.",
                //             "url": "https://www.businessinsider.com/guides/deals/prime-day-laptop-deals-2023-10",
                //             "urlToImage": "https://i.insider.com/6520240d6561dd877e72fea6?width=1200&format=jpeg",
                //             "publishedAt": "2023-10-10T12:52:11Z",
                //             "content": "When you buy through our links, Insider may earn an affiliate commission. Learn more\r\nAmazon's fall Prime Day event, Prime Big Deal Days, has only just started. But we're already seeing great deals o… [+3344 chars]"
                //         },
                //         {
                //             "source": {
                //                 "id": null,
                //                 "name": "Gizmodo.com"
                //             },
                //             "author": "Kevin Hurler",
                //             "title": "OpenAI Shoehorns ChatGPT into New DALL-E 3 Because Why Not?",
                //             "description": "As Big Tech continues to jam every half-baked piece of artificial intelligence into every other over-baked piece of software, OpenAI has come full circle. The AI company behind ChatGPT is placing the wildly popular chatbot into the next version of its image g…",
                //             "url": "https://gizmodo.com/openai-adds-chatgpt-to-new-dall-e-3-image-generator-1850857929",
                //             "urlToImage": "https://i.kinja-img.com/gawker-media/image/upload/c_fill,f_auto,fl_progressive,g_center,h_675,pg_1,q_80,w_1200/16b5881787819604153bf4933d5096fb.jpg",
                //             "publishedAt": "2023-09-20T19:14:25Z",
                //             "content": "As Big Tech continues to jam every half-baked piece of artificial intelligence into every other over-baked piece of software, OpenAI has come full circle. The AI company behind ChatGPT is placing the… [+1711 chars]"
                //         },
                //         {
                //             "source": {
                //                 "id": "engadget",
                //                 "name": "Engadget"
                //             },
                //             "author": "Jessica Conditt",
                //             "title": "Xbox head Phil Spencer responds to a day of massive leaks",
                //             "description": "After a day of leaks comprising an all-digital Xbox Series X, an advanced controller, a \"cloud-hybrid\" console, fruitless Nintendo acquisition plans and some very mean words about Baldur's Gate 3, Xbox head Phil Spencer has spoken publicly — and semi-privatel…",
                //             "url": "https://www.engadget.com/xbox-head-phil-spencer-responds-to-a-day-of-massive-leaks-220326175.html",
                //             "urlToImage": "https://s.yimg.com/ny/api/res/1.2/kWoZhxQbmdoN4_qnqXtNYw--/YXBwaWQ9aGlnaGxhbmRlcjt3PTEyMDA7aD02NzU-/https://s.yimg.com/os/creatr-uploaded-images/2023-09/cff7ad30-5736-11ee-bf1e-fadf9f2b6fbe",
                //             "publishedAt": "2023-09-19T22:03:26Z",
                //             "content": "After a day of leaks comprising an all-digital Xbox Series X, an advanced controller, a \"cloud-hybrid\" console, fruitless Nintendo acquisition plans and some very mean words about Baldur's Gate 3, Xb… [+2885 chars]"
                //         },
                //         {
                //             "source": {
                //                 "id": null,
                //                 "name": "VentureBeat"
                //             },
                //             "author": "Ben Dickson",
                //             "title": "Microsoft’s AutoGen framework allows multiple AI agents to talk to each other and complete your tasks",
                //             "description": "This collaborative approach can lead to significant efficiency gains. According to Microsoft, AutoGen can speed up coding by up to four times.",
                //             "url": "https://venturebeat.com/ai/microsofts-autogen-framework-allows-multiple-ai-agents-to-talk-to-each-other-and-complete-your-tasks/",
                //             "urlToImage": "https://venturebeat.com/wp-content/uploads/2023/10/826150be-bb00-41f7-9952-47ba53104d76.jpeg?w=1200&strip=all",
                //             "publishedAt": "2023-10-03T15:10:37Z",
                //             "content": "VentureBeat presents: AI Unleashed - An exclusive executive event for enterprise data leaders. Network and learn with industry peers.Learn More\r\nMicrosoft has joined the race for large language model… [+1477 chars]"
                //         },
                //         {
                //             "source": {
                //                 "id": null,
                //                 "name": "Slashdot.org"
                //             },
                //             "author": "BeauHD",
                //             "title": "Windows 11's New 'Never Combine' Icons Feature Is Almost Unusable",
                //             "description": "Lawrence Abrams writes via BleepingComputer: After almost three years, Microsoft has finally added the 'Never combine taskbar button' back to Windows, and it still doesn't work correctly. The combine taskbar items feature in Windows 10 allows you to show an i…",
                //             "url": "https://tech.slashdot.org/story/23/09/26/2143211/windows-11s-new-never-combine-icons-feature-is-almost-unusable",
                //             "urlToImage": "https://a.fsdn.com/sd/topics/windows_64.png",
                //             "publishedAt": "2023-09-27T01:02:00Z",
                //             "content": "After almost three years, Microsoft has finally added the 'Never combine taskbar button' back to Windows, and it still doesn't work correctly. The combine taskbar items feature in Windows 10 allows y… [+1452 chars]"
                //         },
                //         {
                //             "source": {
                //                 "id": null,
                //                 "name": "Boing Boing"
                //             },
                //             "author": "Boing Boing's Shop",
                //             "title": "There are tons of reasons to upgrade to Microsoft Windows 10 Pro, and this wildly low price is one of them!",
                //             "description": "We thank our sponsor for making this content possible; it is not written by the editorial staff nor does it necessarily reflect its views. \n\n\n\nTL;DR: From its compatibility to elevated user experience, it's always smooth sailing with Microsoft Windows 10 Pro,…",
                //             "url": "https://boingboing.net/2023/10/09/there-are-tons-of-reasons-to-upgrade-to-microsoft-windows-10-pro-and-this-wildly-low-price-is-one-of-them.html",
                //             "urlToImage": "https://i0.wp.com/boingboing.net/wp-content/uploads/2023/10/sale_321114_article_image.jpg?fit=1200%2C800&ssl=1",
                //             "publishedAt": "2023-10-09T21:00:00Z",
                //             "content": "We thank our sponsor for making this content possible; it is not written by the editorial staff nor does it necessarily reflect its views. \r\nTL;DR: From its compatibility to elevated user experience,… [+2104 chars]"
                //         },
                //         {
                //             "source": {
                //                 "id": "wired",
                //                 "name": "Wired"
                //             },
                //             "author": "Simon Hill",
                //             "title": "Fairphone 5 Review: A More Ethical Phone",
                //             "description": "Boasting ethical manufacturing, easy repairability, and industry-leading software support, this is the moral smartphone choice.",
                //             "url": "https://www.wired.com/review/fairphone-5/",
                //             "urlToImage": "https://media.wired.com/photos/650c7d2f11669ac3f22d263a/191:100/w_1280,c_limit/Fairphone-5-Review-Featured-Gear.jpg",
                //             "publishedAt": "2023-09-22T12:00:00Z",
                //             "content": "The Fairphone 5 is a unique proposition in the world of smartphones. Pick this as your next handset and you send a clear message that you believe in ethical sourcing of manufacturing materials, that … [+3581 chars]"
                //         },
                //         {
                //             "source": {
                //                 "id": "wired",
                //                 "name": "Wired"
                //             },
                //             "author": "Peter Guest",
                //             "title": "Graphcore Was the UK's AI Champion—Now It’s Scrambling to Stay Afloat",
                //             "description": "The British chipmaker wanted to challenge the dominance of Nvidia, but having been left out of government AI projects, is urgently looking to raise money.",
                //             "url": "https://www.wired.com/story/graphcore-uk-ai-champion-scrambling-to-stay-afloat/",
                //             "urlToImage": "https://media.wired.com/photos/651ff4404baa20ea53f1cbf7/191:100/w_1280,c_limit/shutterstock_1459527239.jpg",
                //             "publishedAt": "2023-10-06T11:59:00Z",
                //             "content": "Last month, the UK government announced the home for its new exascale supercomputer, designed to give the country an edge in the global artificial intelligence race. The £900 million ($1.1 billion) p… [+2844 chars]"
                //         },
                //         {
                //             "source": {
                //                 "id": null,
                //                 "name": "Hipertextual"
                //             },
                //             "author": "Luis Miranda",
                //             "title": "La razón por la que Panos Panay, creador de Surface, habría renunciado a Microsoft",
                //             "description": "Microsoft anunció las novedades que llegarán a Windows 11 y su línea Surface durante los próximos meses. Uno de los grandes ausentes fue Panos Panay, quien hasta hace unos días se desempeñaba como director del grupo de Windows y dispositivos. El padre de Surf…",
                //             "url": "http://hipertextual.com/2023/09/panos-panay-surface-renuncia-microsoft-amazon",
                //             "urlToImage": "https://i0.wp.com/imgs.hipertextual.com/wp-content/uploads/2023/09/panos-panay-microsoft-windows-surface.jpg?fit=2500%2C1406&quality=50&strip=all&ssl=1",
                //             "publishedAt": "2023-09-21T20:01:00Z",
                //             "content": "Microsoft anunció las novedades que llegarán a Windows 11 y su línea Surface durante los próximos meses. Uno de los grandes ausentes fue Panos Panay, quien hasta hace unos días se desempeñaba como di… [+3362 chars]"
                //         },
                //         {
                //             "source": {
                //                 "id": null,
                //                 "name": "Hipertextual"
                //             },
                //             "author": "Luis Miranda",
                //             "title": "Microsoft anuncia el lanzamiento de Copilot, el asistente de inteligencia artificial para Windows 11",
                //             "description": "Microsoft dio inicio a su evento especial de Surface y uno de los primeros anuncios tiene que ver con Windows Copilot. El asistente impulsado por IA llegará a Windows 11 en la actualización 23H2, que añadirá otras novedades como el soporte nativo para RAR, me…",
                //             "url": "http://hipertextual.com/2023/09/windows-copilot-fecha-lanzamiento-windows-11",
                //             "urlToImage": "https://imgs.hipertextual.com/wp-content/uploads/2023/09/Microsoft-Copilot.jpg",
                //             "publishedAt": "2023-09-21T15:05:55Z",
                //             "content": "Microsoft dio inicio a su evento especial de Surface y uno de los primeros anuncios tiene que ver con Copilot. El asistente impulsado por IA llegará a Windows 11 en la actualización 23H2, que añadirá… [+1927 chars]"
                //         },
                //         {
                //             "source": {
                //                 "id": null,
                //                 "name": "Hipertextual"
                //             },
                //             "author": "Luis Miranda",
                //             "title": "Microsoft elimina las actualizaciones gratuitas a Windows 11 para algunos usuarios",
                //             "description": "Microsoft eliminará las actualizaciones gratuitas a Windows 11 para los usuarios que continúan en Windows 7 y Windows 8. El gigante tecnológico confirmó el final de un programa que debió concluir en 2016, pero que decidió mantener por varios años. Aquellos qu…",
                //             "url": "http://hipertextual.com/2023/09/microsoft-elimina-actualizaciones-gratuitas-windows-11",
                //             "urlToImage": "https://i0.wp.com/imgs.hipertextual.com/wp-content/uploads/2022/01/Windows-11.jpg?fit=2560%2C1440&quality=50&strip=all&ssl=1",
                //             "publishedAt": "2023-09-29T01:30:00Z",
                //             "content": "Microsoft eliminará las actualizaciones gratuitas a Windows 11 para los usuarios que continúan en Windows 7 y Windows 8. El gigante tecnológico confirmó el final de un programa que debió concluir en … [+3180 chars]"
                //         },
                //         {
                //             "source": {
                //                 "id": null,
                //                 "name": "Hipertextual"
                //             },
                //             "author": "Ebenizer Pinedo",
                //             "title": "La mayor filtración en la historia de Xbox fue culpa de Microsoft, no de la FTC",
                //             "description": "2023 pintaba para ser un año bastante movido para Microsoft. Sobre todo por sus esfuerzos para cerrar la compra de Activision Blizzard. Sin embargo, ahora su año quedará marcado por otro tema: Xbox ha sufrido la mayor filtración en su historia. Durante las úl…",
                //             "url": "http://hipertextual.com/2023/09/la-mayor-filtracion-en-la-historia-de-xbox-fue-culpa-de-microsoft-no-de-la-ftc",
                //             "urlToImage": "https://imgs.hipertextual.com/wp-content/uploads/2023/09/xbox.jpeg",
                //             "publishedAt": "2023-09-19T22:31:00Z",
                //             "content": "2023 pintaba para ser un año bastante movido para Microsoft. Sobre todo por sus esfuerzos para cerrar la compra de Activision Blizzard. Sin embargo, ahora su año quedará marcado por otro tema: Xbox h… [+3845 chars]"
                //         },
                //         {
                //             "source": {
                //                 "id": null,
                //                 "name": "Hipertextual"
                //             },
                //             "author": "Gabriel Erard",
                //             "title": "Microsoft anuncia el Surface Laptop Studio 2, su portátil más potente hasta la fecha",
                //             "description": "Tal y como se esperaba, Microsoft ha aprovechado su evento especial de este jueves para actualizar su catálogo de portátiles Surface. Específicamente, los de Redmond han presentado dos nuevos dispositivos: el Surface Laptop Studio 2 y el Surface Laptop Go 3. …",
                //             "url": "http://hipertextual.com/2023/09/microsoft-surface-laptop-studio-2-caracteristicas-precio",
                //             "urlToImage": "https://imgs.hipertextual.com/wp-content/uploads/2023/09/surface-laptop-studio-2-scaled.jpg",
                //             "publishedAt": "2023-09-21T15:25:07Z",
                //             "content": "Tal y como se esperaba, Microsoft ha aprovechado su evento especial de este jueves para actualizar su catálogo de portátiles Surface. Específicamente, los de Redmond han presentado dos nuevos disposi… [+1923 chars]"
                //         },
                //         {
                //             "source": {
                //                 "id": null,
                //                 "name": "Hipertextual"
                //             },
                //             "author": "Gabriel Erard",
                //             "title": "Microsoft, a nada de completar la compra de Activision Blizzard: el visto bueno de la CMA está al caer",
                //             "description": "Si todo sale como Microsoft espera, la próxima semana podrá cerrar la compra de Activision Blizzard. Según reporta The Verge, los de Redmond son optimistas con recibir aprobación definitiva de la CMA británica antes de la fecha límite. Los de Satya Nadella ap…",
                //             "url": "http://hipertextual.com/2023/10/microsoft-a-nada-de-cerrar-compra-activision-blizzard",
                //             "urlToImage": "https://imgs.hipertextual.com/wp-content/uploads/2022/02/call-of-duty.jpg",
                //             "publishedAt": "2023-10-06T12:45:37Z",
                //             "content": "Si todo sale como Microsoft espera, la próxima semana podrá cerrar la compra de Activision Blizzard. Según reporta The Verge, los de Redmond son optimistas con recibir aprobación definitiva de la CMA… [+3715 chars]"
                //         },
                //         {
                //             "source": {
                //                 "id": null,
                //                 "name": "Hipertextual"
                //             },
                //             "author": "Gabriel Erard",
                //             "title": "Panos Panay, líder de Surface y Windows, se va de Microsoft",
                //             "description": "La semana ha comenzado con una gran sorpresa. Panos Panay, jefe de producto de Microsoft, se marcha de la compañía tras un periplo de casi 20 años. El ejecutivo, quien lideró el área de portátiles Surface y el desarrollo de Windows 11, confirmó su alejamiento…",
                //             "url": "http://hipertextual.com/2023/09/panos-panay-se-va-de-microsoft",
                //             "urlToImage": "https://imgs.hipertextual.com/wp-content/uploads/2023/09/Panos-Panay-scaled.jpg",
                //             "publishedAt": "2023-09-18T16:38:55Z",
                //             "content": "La semana ha comenzado con una gran sorpresa. Panos Panay, jefe de producto de Microsoft, se marcha de la compañía tras un periplo de casi 20 años. El ejecutivo, quien lideró el área de portátiles Su… [+3755 chars]"
                //         },
                //         {
                //             "source": {
                //                 "id": null,
                //                 "name": "Boing Boing"
                //             },
                //             "author": "Grant St. Clair",
                //             "title": "Call of Duty to come to Game Pass, confirming the worst about the Activision-Microsoft merger",
                //             "description": "I can't say I didn't call it. Then again, basically everyone with a passing interest in gaming called it: the acquisition of Activision-Blizzard by gaming giant Microsoft, which I've been writing about every so often as the hotly disputed case progresses, is …",
                //             "url": "https://boingboing.net/2023/10/10/call-of-duty-to-come-to-game-pass-confirming-the-worst-about-the-activision-microsoft-merger.html",
                //             "urlToImage": "https://i0.wp.com/boingboing.net/wp-content/uploads/2015/06/xbox.jpg?fit=1000%2C563&ssl=1",
                //             "publishedAt": "2023-10-10T13:35:17Z",
                //             "content": "I can't say I didn't call it. Then again, basically everyone with a passing interest in gaming called it: the acquisition of Activision-Blizzard by gaming giant Microsoft, which I've been writing abo… [+1298 chars]"
                //         },
                //         {
                //             "source": {
                //                 "id": null,
                //                 "name": "Slashdot.org"
                //             },
                //             "author": "msmash",
                //             "title": "Should New Tech Rules Apply To Microsoft's Bing, Apple's iMessage, EU Asks",
                //             "description": "EU antitrust regulators are asking Microsoft's users and rivals whether Bing should comply with new tough tech rules and also whether that should be the case for Apple's iMessage, Reuters reported Monday, citing people familiar with the matter. From the repor…",
                //             "url": "https://tech.slashdot.org/story/23/10/09/167243/should-new-tech-rules-apply-to-microsofts-bing-apples-imessage-eu-asks",
                //             "urlToImage": "https://a.fsdn.com/sd/topics/eu_64.png",
                //             "publishedAt": "2023-10-09T16:42:00Z",
                //             "content": "The European Commission in September opened investigations to assess whether Microsoft's Bing, Edge and Microsoft Advertising as well as Apple's iMessage should be subject to the Digital Markets Act … [+579 chars]"
                //         },
                //         {
                //             "source": {
                //                 "id": null,
                //                 "name": "ReadWrite"
                //             },
                //             "author": "Adam James",
                //             "title": "Amazon bets big on OpenAI competitor Anthropic",
                //             "description": "In an effort to remain competitive with Microsoft and Google in the artificial intelligence space and capitalize on generative AI, […]\nThe post Amazon bets big on OpenAI competitor Anthropic appeared first on ReadWrite.",
                //             "url": "https://readwrite.com/amazon-anthropic/",
                //             "urlToImage": "https://readwrite.com/wp-content/uploads/2023/06/Save-Thousands-on-Amazon-HC2-Hosting.jpg",
                //             "publishedAt": "2023-09-25T10:22:19Z",
                //             "content": "In an effort to remain competitive with Microsoft and Google in the artificial intelligence space and capitalize on generative AI, Amazon will invest up to $4 billion in Anthropic and take a minority… [+1135 chars]"
                //         },
                //         {
                //             "source": {
                //                 "id": "time",
                //                 "name": "Time"
                //             },
                //             "author": "Will Henshall",
                //             "title": "Amazon’s Partnership With Anthropic Shows Size Matters in the AI Industry",
                //             "description": "Amazon's $4 billion partnership with Anthropic allows it to compete with with Google and Microsoft for AI supremacy.",
                //             "url": "https://time.com/6317366/amazon-anthropic-ai-deal/",
                //             "urlToImage": "https://api.time.com/wp-content/uploads/2023/07/Siblings-recent-photo.jpg?quality=85",
                //             "publishedAt": "2023-09-25T22:20:04Z",
                //             "content": "Amazon announced today (Sept. 25) it will invest up to $4 billion into Anthropic, an AI developer known for developing language models such as Claude 2, a competitor to OpenAIs ChatGPT.\r\nAs part of t… [+5967 chars]"
                //         },
                //         {
                //             "source": {
                //                 "id": null,
                //                 "name": "Boing Boing"
                //             },
                //             "author": "Boing Boing's Shop",
                //             "title": "Upgrade your workspace and get a Microsoft Surface laptop for only $425.99 now",
                //             "description": "We thank our sponsor for making this content possible; it is not written by the editorial staff nor does it necessarily reflect its views.\n\n\n\nTL;DR: Everyone deserves a quality portable computer! Get a Microsoft Surface laptop, typically retailing for $844, f…",
                //             "url": "https://boingboing.net/2023/09/22/upgrade-your-workspace-and-get-a-microsoft-surface-laptop-for-only-425-99-now.html",
                //             "urlToImage": "https://i0.wp.com/boingboing.net/wp-content/uploads/2023/09/Boing-Boing-Microsoft-Surface.jpeg?fit=1200%2C800&ssl=1",
                //             "publishedAt": "2023-09-22T21:00:00Z",
                //             "content": "We thank our sponsor for making this content possible; it is not written by the editorial staff nor does it necessarily reflect its views.\r\nTL;DR: Everyone deserves a quality portable computer! Get a… [+1838 chars]"
                //         },
                //         {
                //             "source": {
                //                 "id": null,
                //                 "name": "Boing Boing"
                //             },
                //             "author": "Boing Boing's Shop",
                //             "title": "Upgrade your computer setup with a $380 Dell Optiplex 3020 Desktop that comes with Microsoft Office",
                //             "description": "We thank our sponsor for making this content possible; it is not written by the editorial staff nor does it necessarily reflect its views.\n\n\n\nTL;DR: Tired of dealing with a slow and under-performing computer? Increase your productivity with a refurbished Dell…",
                //             "url": "https://boingboing.net/2023/09/25/upgrade-your-computer-setup-with-a-380-dell-optiplex-3020-desktop-that-comes-with-microsoft-office.html",
                //             "urlToImage": "https://i0.wp.com/boingboing.net/wp-content/uploads/2023/09/Boing-Boing-Dell-MSO.jpeg?fit=1200%2C800&ssl=1",
                //             "publishedAt": "2023-09-25T15:00:00Z",
                //             "content": "We thank our sponsor for making this content possible; it is not written by the editorial staff nor does it necessarily reflect its views.\r\nTL;DR: Tired of dealing with a slow and under-performing co… [+2270 chars]"
                //         },
                //         {
                //             "source": {
                //                 "id": null,
                //                 "name": "Hipertextual"
                //             },
                //             "author": "Gabriel Erard",
                //             "title": "Microsoft pudo comprar Nintendo antes que a Bethesda o Activision: por qué no lo hizo",
                //             "description": "Comprar Nintendo era el gran objetivo que perseguía Phil Spencer, el líder de Xbox, antes de las adquisiciones de ZeniMax Media (Bethesda) y Activision Blizzard. Esto quedó al descubierto tras la publicación de documentos confidenciales vinculados con el reci…",
                //             "url": "http://hipertextual.com/2023/09/microsoft-analizo-comprar-nintendo",
                //             "urlToImage": "https://imgs.hipertextual.com/wp-content/uploads/2023/09/max-harlynking-UdCNVHNgHdI-unsplash-scaled.jpg",
                //             "publishedAt": "2023-09-19T15:11:02Z",
                //             "content": "Comprar Nintendo era el gran objetivo que perseguía Phil Spencer, el líder de Xbox, antes de las adquisiciones de ZeniMax Media (Bethesda) y Activision Blizzard. Esto quedó al descubierto tras la pub… [+5782 chars]"
                //         },
                //         {
                //             "source": {
                //                 "id": null,
                //                 "name": "Boing Boing"
                //             },
                //             "author": "Boing Boing's Shop",
                //             "title": "For $359, this Lenovo ThinkPad T480 + Microsoft Office Pro (2021) combo can be yours",
                //             "description": "We thank our sponsor for making this content possible; it is not written by the editorial staff nor does it necessarily reflect its view\n\n\n\nTL;DR: This two-for-one Lenovo ThinkPad480 + Microsoft Office Professional (2021) is a productivity workhorse. Purchase…",
                //             "url": "https://boingboing.net/2023/09/21/for-359-this-lenovo-thinkpad-t480-microsoft-office-pro-2021-combo-can-be-yours.html",
                //             "urlToImage": "https://i0.wp.com/boingboing.net/wp-content/uploads/2023/09/Boing-Boing-Lenovo-Thinkpad-1.jpeg?fit=1200%2C800&ssl=1",
                //             "publishedAt": "2023-09-21T21:00:00Z",
                //             "content": "We thank our sponsor for making this content possible; it is not written by the editorial staff nor does it necessarily reflect its view\r\nTL;DR: This two-for-one Lenovo ThinkPad480 + Microsoft Office… [+2340 chars]"
                //         },
                //         {
                //             "source": {
                //                 "id": null,
                //                 "name": "Boing Boing"
                //             },
                //             "author": "Boing Boing's Shop",
                //             "title": "Get more work done with a lifetime of Microsoft Office for less than $35 today",
                //             "description": "We thank our sponsor for making this content possible; it is not written by the editorial staff nor does it necessarily reflect its views. \n\n\n\nTL;DR: Microsoft Office is a business essential, and right now, you can grab a lifetime of it at a special price dro…",
                //             "url": "https://boingboing.net/2023/09/20/get-more-work-done-with-a-lifetime-of-microsoft-office-for-less-than-35-today.html",
                //             "urlToImage": "https://i0.wp.com/boingboing.net/wp-content/uploads/2023/09/Boing-Boing-MSO.jpeg?fit=1200%2C800&ssl=1",
                //             "publishedAt": "2023-09-20T21:00:00Z",
                //             "content": "We thank our sponsor for making this content possible; it is not written by the editorial staff nor does it necessarily reflect its views. \r\nTL;DR: Microsoft Office is a business essential, and right… [+1926 chars]"
                //         },
                //         {
                //             "source": {
                //                 "id": null,
                //                 "name": "Boing Boing"
                //             },
                //             "author": "Boing Boing's Shop",
                //             "title": "Here's how to get Rosetta Stone and Microsoft Office for $199.99",
                //             "description": "We thank our sponsor for making this content possible; it is not written by the editorial staff nor does it necessarily reflect its views. \n\n\n\nTL;DR: Want to learn something cool and get access to software you might not need to pay for every month? — Read the…",
                //             "url": "https://boingboing.net/2023/09/27/heres-how-to-get-rosetta-stone-and-microsoft-office-for-199-99.html",
                //             "urlToImage": "https://i0.wp.com/boingboing.net/wp-content/uploads/2023/09/Boing-Boing-Rosetta-MSO.jpeg?fit=1200%2C800&ssl=1",
                //             "publishedAt": "2023-09-27T21:00:00Z",
                //             "content": "We thank our sponsor for making this content possible; it is not written by the editorial staff nor does it necessarily reflect its views. \r\nTL;DR: Want to learn something cool and get access to soft… [+2039 chars]"
                //         },
                //         {
                //             "source": {
                //                 "id": null,
                //                 "name": "Boing Boing"
                //             },
                //             "author": "Boing Boing's Shop",
                //             "title": "Get top computer protections and upgrades with Microsoft Windows 11 Pro, now $29.97",
                //             "description": "We thank our sponsor for making this content possible; it is not written by the editorial staff nor does it necessarily reflect its views. \n\n\n\nTL;DR: Every computer needs a software operating system, so why not get the one of the top programs around? — Read t…",
                //             "url": "https://boingboing.net/2023/10/08/get-top-computer-protections-and-upgrades-with-microsoft-windows-11-pro-now-29-97.html",
                //             "urlToImage": "https://i0.wp.com/boingboing.net/wp-content/uploads/2023/10/Boing-Boing-W11.jpeg?fit=1200%2C800&ssl=1",
                //             "publishedAt": "2023-10-08T21:00:00Z",
                //             "content": "We thank our sponsor for making this content possible; it is not written by the editorial staff nor does it necessarily reflect its views. \r\nTL;DR: Every computer needs a software operating system, s… [+2532 chars]"
                //         },
                //         {
                //             "source": {
                //                 "id": "the-verge",
                //                 "name": "The Verge"
                //             },
                //             "author": "Sean Hollister",
                //             "title": "Steam just turned 20 years old and Valve is celebrating",
                //             "description": "Steam is 20 years old. The company’s got a cute walk down memory lane to help celebrate, too. But don’t go looking there for a history of Steam itself... perhaps because Steam was a tad controversial?",
                //             "url": "https://www.theverge.com/2023/9/12/23870270/steam-20-birthday-2003-2023",
                //             "urlToImage": "https://cdn.vox-cdn.com/thumbor/30teQnVkJE9HdwmJG-g2G667TDs=/0x0:1452x925/1200x628/filters:focal(678x624:679x625)/cdn.vox-cdn.com/uploads/chorus_asset/file/24916061/Steam20th_Header.png",
                //             "publishedAt": "2023-09-12T18:52:27Z",
                //             "content": "Steam just turned 20 years old and Valve is celebrating\r\nSteam just turned 20 years old and Valve is celebrating\r\n / The game digital distribution platform launched September 12th, 2003.\r\nBySean Holl… [+2924 chars]"
                //         },
                //         {
                //             "source": {
                //                 "id": null,
                //                 "name": "MacRumors"
                //             },
                //             "author": "Juli Clover",
                //             "title": "Apple Releases iTunes for Windows Update With Support for iPhone 15 Models",
                //             "description": "Apple today released an iTunes 12.12.10 update for Windows users, and the new software adds both security improvements and support for new devices that include the iPhone 15 and iPhone 15 Pro models.\n\n\n\n\n\niTunes for Windows is not updated on a regular basis, …",
                //             "url": "https://www.macrumors.com/2023/09/13/apple-itunes-for-windows-iphone-15/",
                //             "urlToImage": "https://images.macrumors.com/t/eFsRunD6Ujk4S9_S-62_JGs0ZQg=/2000x/article-new/2022/05/itunes-for-windows.jpg",
                //             "publishedAt": "2023-09-13T17:45:11Z",
                //             "content": "Apple today released an iTunes 12.12.10 update for Windows users, and the new software adds both security improvements and support for new devices that include the iPhone 15 and iPhone 15 Pro models.… [+555 chars]"
                //         },
                //         {
                //             "source": {
                //                 "id": null,
                //                 "name": "ReadWrite"
                //             },
                //             "author": "Deanna Ritchie",
                //             "title": "Leaked Bethesda Titles Ignite Gaming Frenzy",
                //             "description": "Documents that were leaked indicate Bethesda’s plans for fiscal years 2020 to 2024, suggesting the potential launch of new Doom […]\nThe post Leaked Bethesda Titles Ignite Gaming Frenzy appeared first on ReadWrite.",
                //             "url": "https://readwrite.com/leaked-bethesda-titles-ignite-gaming-frenzy/",
                //             "urlToImage": "https://readwrite.com/wp-content/uploads/2023/09/Leaked-Bethesda-Titles.jpg",
                //             "publishedAt": "2023-09-27T23:00:52Z",
                //             "content": "Documents that were leaked indicate Bethesda’s plans for fiscal years 2020 to 2024, suggesting the potential launch of new Doom and Dishonored games. The strategy, which appeared online via uncensore… [+5473 chars]"
                //         },
                //         {
                //             "source": {
                //                 "id": "bloomberg",
                //                 "name": "Bloomberg"
                //             },
                //             "author": "John Gruber",
                //             "title": "Microsoft Pitched Apple on Buying Bing",
                //             "description": null,
                //             "url": "https://www.bloomberg.com/news/articles/2023-09-28/microsoft-discussed-selling-bing-to-apple-as-google-replacement?srnd=technology-vp&leadSource=uverify%20wall",
                //             "urlToImage": null,
                //             "publishedAt": "2023-10-02T23:33:13Z",
                //             "content": "Mark Gurman and Dina Bass, reporting for Bloomberg over the weekend:\n\n\n Executives from Microsoft met with Apple’s services chief, Eddy \nCue, who brokered the current search engine relationship with … [+382 chars]"
                //         },
                //         {
                //             "source": {
                //                 "id": null,
                //                 "name": "Gizmodo.com"
                //             },
                //             "author": "Kevin Hurler",
                //             "title": "iPhone Designer Jony Ive Reportedly Discussing a Mystery Hardware Project With OpenAI",
                //             "description": "OpenAI is looking to continue to bolster its reputation as a modern-day tech juggernaut by pivoting from its incredibly popular software to hardware. The company’s CEO Sam Altman is reportedly in talks with Apple alumnus and product designer Jony Ive on the t…",
                //             "url": "https://gizmodo.com/jony-ive-altman-openai-talk-mystery-hardware-project-1850877089",
                //             "urlToImage": "https://i.kinja-img.com/gawker-media/image/upload/c_fill,f_auto,fl_progressive,g_center,h_675,pg_1,q_80,w_1200/b00057f6f585969f7e9a25343b0cc3a0.jpg",
                //             "publishedAt": "2023-09-27T13:46:00Z",
                //             "content": "OpenAI is looking to continue to bolster its reputation as a modern-day tech juggernaut by pivoting from its incredibly popular software to hardware. The companys CEO Sam Altman is reportedly in talk… [+2400 chars]"
                //         },
                //         {
                //             "source": {
                //                 "id": null,
                //                 "name": "Boing Boing"
                //             },
                //             "author": "Grant St. Clair",
                //             "title": "Leaked documents reveal Microsoft's desire to buy Nintendo",
                //             "description": "Microsoft vs. FTC is the gift that keeps on giving. Although it seems Microsoft is going to snap up Activision-Blizzard with very few issues, a recent leak of court documents is a veritable treasure trove of internal information about Xbox. \n\n\n\nHighlights inc…",
                //             "url": "https://boingboing.net/2023/09/20/leaked-documents-reveal-xboxs-desire-to-buy-nintendo.html",
                //             "urlToImage": "https://i0.wp.com/boingboing.net/wp-content/uploads/2023/06/shutterstock_2293173941-scaled.jpg?fit=1200%2C675&ssl=1",
                //             "publishedAt": "2023-09-20T08:26:40Z",
                //             "content": "Microsoft vs. FTC is the gift that keeps on giving. Although it seems Microsoft is going to snap up Activision-Blizzard with very few issues, a recent leak of court documents is a veritable treasure … [+869 chars]"
                //         },
                //         {
                //             "source": {
                //                 "id": null,
                //                 "name": "Hipertextual"
                //             },
                //             "author": "Gabriel Erard",
                //             "title": "¿La compra de Bethesda por Microsoft afectó el desarrollo de ‘Starfield’? Su director responde",
                //             "description": "A pocos días de cumplirse un mes de su lanzamiento general, Starfield continúa cosechando elogios. El nuevo juego de Bethesda está en boca de todos, pero, más allá del furor inmediato, sus realizadores apuestan a convertirlo en un éxito duradero. Además, grac…",
                //             "url": "http://hipertextual.com/2023/10/compra-bethesda-microsoft-afecto-starfield",
                //             "urlToImage": "https://imgs.hipertextual.com/wp-content/uploads/2023/08/Starfield-2-scaled.jpeg",
                //             "publishedAt": "2023-10-02T13:03:02Z",
                //             "content": "A pocos días de cumplirse un mes de su lanzamiento general, Starfield continúa cosechando elogios. El nuevo juego de Bethesda está en boca de todos, pero, más allá del furor inmediato, sus realizador… [+3529 chars]"
                //         },
                //         {
                //             "source": {
                //                 "id": null,
                //                 "name": "Hipertextual"
                //             },
                //             "author": "Luis Miranda",
                //             "title": "Amazon podría contratar a Panos Panay tras su abrupta salida de Microsoft",
                //             "description": "Panos Panay podría integrarse a las filas de Amazon. Tras anunciar su renuncia de forma sorpresiva, el líder de Surface y Windows ya tendría un hogar asegurado. Un reporte de Bloomberg asegura que Panos fichará con el gigante del comercio electrónico para hac…",
                //             "url": "http://hipertextual.com/2023/09/amazon-podria-contratar-a-panos-panay-tras-salida-microsoft",
                //             "urlToImage": "https://imgs.hipertextual.com/wp-content/uploads/2020/02/hipertextual-microsoft-fusiona-su-division-windows-y-dispositivos-con-panos-panay-frente-2020456546.jpg",
                //             "publishedAt": "2023-09-18T20:06:14Z",
                //             "content": "Panos Panay podría integrarse a las filas de Amazon. Tras anunciar su renuncia de forma sorpresiva, el líder de Surface y Windows ya tendría un hogar asegurado. Un reporte de Bloombergasegura que Pan… [+3444 chars]"
                //         },
                //         {
                //             "source": {
                //                 "id": null,
                //                 "name": "VentureBeat"
                //             },
                //             "author": "Dean Takahashi",
                //             "title": "U.K. regulators finally approve Microsoft’s $68.7B acquisition of Activision Blizzard",
                //             "description": "The United Kingdom's antitrust agency has finally approved Microsoft's $68.7 billion acquisition of Activision Blizzard.",
                //             "url": "https://venturebeat.com/gaming-business/u-k-regulators-finally-approve-microsofts-68-7b-acquisition-of-activision-blizzard/",
                //             "urlToImage": "https://venturebeat.com/wp-content/uploads/2023/08/MW3_CP_REVEAL_08_BRANDED-1.jpg?w=1200&strip=all",
                //             "publishedAt": "2023-09-22T06:46:00Z",
                //             "content": "We're thrilled to announce the return of GamesBeat Next, hosted in San Francisco this October, where we will explore the theme of \"Playing the Edge.\" Apply to speak here and learn more about sponsors… [+1536 chars]"
                //         },
                //         {
                //             "source": {
                //                 "id": null,
                //                 "name": "Xataka.com"
                //             },
                //             "author": "Enrique Pérez",
                //             "title": "Vía libre para Microsoft y Activision: Reino Unido levanta el veto a la compra tras el acuerdo con Ubisoft",
                //             "description": "Ha costado, pero finalmente Microsoft ha logrado convencer al regulador británico. Era la última piedra que necesitaba para completar la compra de Activision Blizzard. Todavía no está cerrada la decisión, pero la Autoridad de Competencia y Mercados de Reino U…",
                //             "url": "https://www.xataka.com/empresas-y-economia/via-libre-para-microsoft-activision-reino-unido-levanta-veto-a-compra-acuerdo-ubisoft",
                //             "urlToImage": "https://i.blogs.es/6b7b32/reino-unido-microsoft/840_560.jpeg",
                //             "publishedAt": "2023-09-22T07:59:58Z",
                //             "content": "Ha costado, pero finalmente Microsoft ha logrado convencer al regulador británico. Era la última piedra que necesitaba para completar la compra de Activision Blizzard. Todavía no está cerrada la deci… [+2774 chars]"
                //         },
                //         {
                //             "source": {
                //                 "id": null,
                //                 "name": "VentureBeat"
                //             },
                //             "author": "Bryson Masse",
                //             "title": "Researchers turn to Harry Potter to make AI forget about copyrighted material",
                //             "description": "Their unlearning technique may also be more effective for fictional texts than non-fiction, since fictional worlds contain more unique...",
                //             "url": "https://venturebeat.com/ai/researchers-turn-to-harry-potter-to-make-ai-forget-about-copyright-material/",
                //             "urlToImage": "https://venturebeat.com/wp-content/uploads/2023/10/cfr0z3n_child_wizard_with_dark_hair_and_glasses_waves_a_wand_an_5e85ac77-f867-4fde-84ed-22aa8c214dc4.png?w=1200&strip=all",
                //             "publishedAt": "2023-10-06T22:20:01Z",
                //             "content": "VentureBeat presents: AI Unleashed - An exclusive executive event for enterprise data leaders. Network and learn with industry peers.Learn More\r\nAs the debate heats up around the use of copyrighted w… [+1271 chars]"
                //         },
                //         {
                //             "source": {
                //                 "id": null,
                //                 "name": "CNET"
                //             },
                //             "author": "Adam Oram",
                //             "title": "Bag a Windows 11 Pro License for Just $30 While This Deal Lasts - CNET",
                //             "description": "This limited-time offer saves you $170 compared to Microsoft's price.",
                //             "url": "https://www.cnet.com/deals/snag-windows-11-pro-lifetime-license-just-30/",
                //             "urlToImage": "https://www.cnet.com/a/img/resize/34fc724f6a53ceb9739005a4c96f695c2008122d/hub/2023/04/13/1cced261-5119-4468-b30b-de3a609846c8/windows-11-pro-box.png?auto=webp&fit=crop&height=675&width=1200",
                //             "publishedAt": "2023-09-15T14:34:00Z",
                //             "content": "You'll need more than advanced hardware to build a decent PC. The operating system is one of the most important components, and if you want to run Windows on your freshly-assembled desktop, then we'v… [+1596 chars]"
                //         },
                //         {
                //             "source": {
                //                 "id": null,
                //                 "name": "Slashdot.org"
                //             },
                //             "author": "msmash",
                //             "title": "Amazon To Invest As Much As $4 Billion in AI Startup Anthropic",
                //             "description": "Amazon has agreed to invest up to $4 billion in the AI startup Anthropic, the two firms said, as the e-commerce group steps up its rivalry against Microsoft, Meta, Google and Nvidia in the fast-growing sector that many technologists believe could be the next …",
                //             "url": "https://slashdot.org/story/23/09/25/1319210/amazon-to-invest-as-much-as-4-billion-in-ai-startup-anthropic",
                //             "urlToImage": "https://a.fsdn.com/sd/topics/ai_64.png",
                //             "publishedAt": "2023-09-25T14:00:00Z",
                //             "content": "Sign up for the Slashdot newsletter! OR check out the new Slashdot job board to browse remote jobs or jobs in your areaDo you develop on GitHub? You can keep using GitHub but automatically sync your … [+268 chars]"
                //         },
                //         {
                //             "source": {
                //                 "id": null,
                //                 "name": "CNET"
                //             },
                //             "author": "Adam Oram",
                //             "title": "Save $172 on a Windows 11 Pro License Before This Deal Runs Out - CNET",
                //             "description": "While a Windows 11 Pro license usually costs $200, you can grab it now for just $27, but only while this deal lasts.",
                //             "url": "https://www.cnet.com/deals/save-172-on-a-windows-11-pro-license-before-this-deal-runs-out/",
                //             "urlToImage": "https://www.cnet.com/a/img/resize/34fc724f6a53ceb9739005a4c96f695c2008122d/hub/2023/04/13/1cced261-5119-4468-b30b-de3a609846c8/windows-11-pro-box.png?auto=webp&fit=crop&height=675&width=1200",
                //             "publishedAt": "2023-10-09T17:17:44Z",
                //             "content": "If you want to upgrade your current PC to Windows 11, it can sometimes cost you a significant sum, especially if you're buying a lifetime copy from Microsoft, which sells it at $200. So what do you d… [+1523 chars]"
                //         },
                //         {
                //             "source": {
                //                 "id": "business-insider",
                //                 "name": "Business Insider"
                //             },
                //             "author": "Jordan Hart",
                //             "title": "MSN readers are furious after an apparently AI-generated headline said 'Brandon Hunter useless at 42' after the former NBA player suddenly died",
                //             "description": "MSN has taken down the article, which included strange wording about the death of the former pro basketball player. Readers suspected it to be the work of artificial intelligence.",
                //             "url": "https://www.businessinsider.com/apparently-ai-generated-obituary-headline-nba-player-brandon-hunter-useless-2023-9",
                //             "urlToImage": "https://i.insider.com/6504cbfcc72f090019a7df30?width=1200&format=jpeg",
                //             "publishedAt": "2023-09-15T21:54:41Z",
                //             "content": "Brandon Hunter, left, played for the Boston Celtics and Orlando Magic during his time in the NBA. The cause of his sudden death remains unclear.JOHN SPIVEY/Associated Press\r\n<ul><li>MSN readers calle… [+2594 chars]"
                //         },
                //         {
                //             "source": {
                //                 "id": null,
                //                 "name": "Lifehacker.com"
                //             },
                //             "author": "Lindsey Ellefson",
                //             "title": "The Best Study and Time Management Apps for College Students",
                //             "description": "Being a college student is one of those “it takes a village”situations: Family members, friends, professors, and administrators can all help you along the way. But with the right suite of tools, your phone can also be one of your greatest allies when it comes…",
                //             "url": "https://lifehacker.com/best-study-apps-for-college-students-1850888147",
                //             "urlToImage": "https://i.kinja-img.com/image/upload/c_fill,f_auto,fl_progressive,g_center,h_675,pg_1,q_80,w_1200/7a80b76697111632f8f4ea003b12e5f6.jpg",
                //             "publishedAt": "2023-10-02T15:00:00Z",
                //             "content": "Being a college student is one of those it takes a villagesituations: Family members, friends, professors, and administrators can all help you along the way. But with the right suite of tools, your p… [+4091 chars]"
                //         },
                //         {
                //             "source": {
                //                 "id": null,
                //                 "name": "MacRumors"
                //             },
                //             "author": "Tim Hardwick",
                //             "title": "EU Asks iMessage Users and Rivals If Service Should Be Regulated",
                //             "description": "EU antitrust regulators have asked Apple's users and rivals to rate the importance of Apple's iMessage and Microsoft's Bing versus competing services, reports Reuters.\n\n\n\n\n\nAccording to people familiar with the matter, the European Commission sent out the que…",
                //             "url": "https://www.macrumors.com/2023/10/10/eu-asks-imessage-users-service-regulation/",
                //             "urlToImage": "https://images.macrumors.com/t/f_Ckn-OXTcO2gXoQ78n-kxHVC6Y=/2446x/article-new/2021/06/iMessages-Microsoft-feature.jpg",
                //             "publishedAt": "2023-10-10T10:57:01Z",
                //             "content": "EU antitrust regulators have asked Apple's users and rivals to rate the importance of Apple's iMessage and Microsoft's Bing versus competing services, reports Reuters.\r\nAccording to people familiar w… [+1828 chars]"
                //         },
                //         {
                //             "source": {
                //                 "id": null,
                //                 "name": "Hipertextual"
                //             },
                //             "author": "Luis Miranda",
                //             "title": "Xbox Mastercard, una tarjeta de crédito que incluye puntos que puedes canjear por juegos",
                //             "description": "Xbox anunció el lanzamiento de una tarjeta de crédito que otorga beneficios al comprar juegos y otros servicios como Netflix o Disney+. Conocida como Xbox Mastercard, la tarjeta será emitida por Barclays y podrá personalizarse con tu gamertag. Al igual que oc…",
                //             "url": "http://hipertextual.com/2023/09/xbox-mastercard-tarjeta-credito-puntos-beneficio",
                //             "urlToImage": "https://i0.wp.com/imgs.hipertextual.com/wp-content/uploads/2023/09/xbox_mastercard_tarjeta_credito.jpg?fit=1920%2C1080&quality=50&strip=all&ssl=1",
                //             "publishedAt": "2023-09-11T19:01:00Z",
                //             "content": "Xbox anunció el lanzamiento de una tarjeta de crédito que otorga beneficios al comprar juegos y otros servicios como Netflix o Disney+. Conocida como Xbox Mastercard, la tarjeta será emitida por Barc… [+2734 chars]"
                //         },
                //         {
                //             "source": {
                //                 "id": null,
                //                 "name": "Boing Boing"
                //             },
                //             "author": "Boing Boing's Shop",
                //             "title": "This Microsoft Office Pro 2021 price tag puts Prime Day deals to shame",
                //             "description": "We thank our sponsor for making this content possible; it is not written by the editorial staff nor does it necessarily reflect its views. \n\n\n\nTL;DR: When it comes to work, you don't play around, and with this lifetime license to Microsoft Office Professional…",
                //             "url": "https://boingboing.net/2023/10/06/this-microsoft-office-pro-2021-price-tag-puts-prime-day-deals-to-shame.html",
                //             "urlToImage": "https://i0.wp.com/boingboing.net/wp-content/uploads/2023/10/BOING-MSO.jpeg?fit=1200%2C800&ssl=1",
                //             "publishedAt": "2023-10-06T21:00:00Z",
                //             "content": "We thank our sponsor for making this content possible; it is not written by the editorial staff nor does it necessarily reflect its views. \r\nTL;DR: When it comes to work, you don't play around, and w… [+2485 chars]"
                //         },
                //         {
                //             "source": {
                //                 "id": null,
                //                 "name": "Boing Boing"
                //             },
                //             "author": "Boing Boing's Shop",
                //             "title": "You can score Microsoft Windows OS for just $29.97 until September 17!",
                //             "description": "We thank our sponsor for making this content possible; it is not written by the editorial staff nor does it necessarily reflect its views.\n\n\n\nTL;DR: If you're looking for a way to give your Microsoft product a facelift, you can get a lifetime license to Windo…",
                //             "url": "https://boingboing.net/2023/09/14/you-can-score-microsoft-windows-os-for-just-29-97-until-september-17.html",
                //             "urlToImage": "https://i0.wp.com/boingboing.net/wp-content/uploads/2023/09/Boing-Boing-Windows-11-Pro.jpeg?fit=1200%2C800&ssl=1",
                //             "publishedAt": "2023-09-14T21:00:00Z",
                //             "content": "We thank our sponsor for making this content possible; it is not written by the editorial staff nor does it necessarily reflect its views.\r\nTL;DR: If you're looking for a way to give your Microsoft p… [+2122 chars]"
                //         },
                //         {
                //             "source": {
                //                 "id": null,
                //                 "name": "Kotaku"
                //             },
                //             "author": "Levi Winslow",
                //             "title": "Your September-October Xbox Game Pass Offerings Await",
                //             "description": "Microsoft has announced the next crop of games you can snatch up on Xbox Game Pass for the rest of September and the early parts of October. The offerings are pretty lowkey, but there’s some cool stuff to download right now.Read more...",
                //             "url": "https://kotaku.com/xbox-game-pass-free-lies-of-p-gotham-knights-payday-3-1850854434",
                //             "urlToImage": "https://i.kinja-img.com/gawker-media/image/upload/c_fill,f_auto,fl_progressive,g_center,h_675,pg_1,q_80,w_1200/f158838b54389832cd625773e6a4bc60.jpg",
                //             "publishedAt": "2023-09-19T20:48:06Z",
                //             "content": "Microsoft has announced the next crop of games you can snatch up on Xbox Game Pass for the rest of September and the early parts of October. The offerings are pretty lowkey, but theres some cool stuf… [+2058 chars]"
                //         },
                //         {
                //             "source": {
                //                 "id": null,
                //                 "name": "Kotaku"
                //             },
                //             "author": "Alyssa Mercante",
                //             "title": "Bethesda Road Map Leaks, Includes Oblivion Remaster And Dishonored 3",
                //             "description": "Bethesda is (or was) reportedly working on remasters for Fallout 3 and The Elder Scrolls IV: Oblivion, according to a document released as part of a massive Microsoft leak. A bevy of partially redacted/confidential emails and documents that were a part of the…",
                //             "url": "https://kotaku.com/bethesda-new-games-leak-oblivion-doom-year-zero-fallout-1850852604",
                //             "urlToImage": "https://i.kinja-img.com/gawker-media/image/upload/c_fill,f_auto,fl_progressive,g_center,h_675,pg_1,q_80,w_1200/7c7fa499a615362637019dc52307b39e.jpg",
                //             "publishedAt": "2023-09-19T15:09:00Z",
                //             "content": "Bethesda is (or was) reportedly working on remasters for Fallout 3 and The Elder Scrolls IV: Oblivion, according to a document released as part of a massive Microsoft leak. A bevy of partially redact… [+2773 chars]"
                //         },
                //         {
                //             "source": {
                //                 "id": null,
                //                 "name": "Hipertextual"
                //             },
                //             "author": "Alberto Martín",
                //             "title": "Filtrada la nueva Xbox con un diseño rompedor y un nuevo mando totalmente modular",
                //             "description": "Microsoft pretende lanzar una nueva consola Xbox durante 2028. Es un secreto a voces. No obstante, como ya suele ser habitual en las consolas de sobremesa, tiene pensado poner en el mercado un modelo renovado de su actual Series X. O al menos así lo apuntan d…",
                //             "url": "http://hipertextual.com/2023/09/nueva-xbox-series-x-2024",
                //             "urlToImage": "https://imgs.hipertextual.com/wp-content/uploads/2022/11/xbox-scaled.jpg",
                //             "publishedAt": "2023-09-19T08:40:32Z",
                //             "content": "Microsoft pretende lanzar una nueva consola Xbox durante 2028. Es un secreto a voces. No obstante, como ya suele ser habitual en las consolas de sobremesa, tiene pensado poner en el mercado un modelo… [+2324 chars]"
                //         },
                //         {
                //             "source": {
                //                 "id": null,
                //                 "name": "Hipertextual"
                //             },
                //             "author": "Gabriel Erard",
                //             "title": "Stadia fracasó por la falta de juegos de primer nivel y Microsoft tuvo parte de la culpa, afirma Google",
                //             "description": "El fracaso de Stadia vuelve a tomar relevancia tras las declaraciones de Dov Zimring, el exlíder de producto de la plataforma de juegos en la nube de Google. En una declaración realizada en el marco del juicio entre Microsoft y la FTC por la compra de Activis…",
                //             "url": "http://hipertextual.com/2023/09/google-stadia-fracaso-juegos-aaa-microsoft",
                //             "urlToImage": "https://imgs.hipertextual.com/wp-content/uploads/2023/01/Stadia-mando.jpg",
                //             "publishedAt": "2023-09-19T19:01:19Z",
                //             "content": "El fracaso de Stadia vuelve a tomar relevancia tras las declaraciones de Dov Zimring, el exlíder de producto de la plataforma de juegos en la nube de Google. En una declaración realizada en el marco … [+4636 chars]"
                //         },
                //         {
                //             "source": {
                //                 "id": null,
                //                 "name": "Slashdot.org"
                //             },
                //             "author": "EditorDavid",
                //             "title": "Zoom is Launching Its Own AI-Powered Google Docs Competitor",
                //             "description": "An anonymous reader shared this report from Gizmodo:\n\nZoom is setting out to compete with Google and Microsoft by introducing Zoom Docs at its annual Zoomtopia 2023 event on Tuesday. Zoom Docs is the company's own version of an AI-powered workspace that will …",
                //             "url": "https://slashdot.org/story/23/10/07/0327248/zoom-is-launching-its-own-ai-powered-google-docs-competitor",
                //             "urlToImage": "https://a.fsdn.com/sd/topics/ai_64.png",
                //             "publishedAt": "2023-10-07T19:34:00Z",
                //             "content": "Zoom is setting out to compete with Google and Microsoft by introducing Zoom Docs at its annual Zoomtopia 2023 event on Tuesday. Zoom Docs is the company's own version of an AI-powered workspace that… [+478 chars]"
                //         },
                //         {
                //             "source": {
                //                 "id": "engadget",
                //                 "name": "Engadget"
                //             },
                //             "author": "Mat Smith",
                //             "title": "The Morning After: X sues X",
                //             "description": "A Florida-based company called X Social Media has accused Elon Musk’s X Corp. of trademark and service mark infringement. With SpaceX, AI venture xAI (not to mention the brief existence of banking startup x.com), Musk really loves the letter X. At the time of…",
                //             "url": "https://www.engadget.com/the-morning-after-x-sues-x-111619372.html",
                //             "urlToImage": "https://s.yimg.com/ny/api/res/1.2/nvHl2d17ML5Kp7e6i8fhdw--/YXBwaWQ9aGlnaGxhbmRlcjt3PTEyMDA7aD02NzQ-/https://s.yimg.com/os/creatr-uploaded-images/2023-10/1fa7c7d0-6163-11ee-bfca-b0174d604bfc",
                //             "publishedAt": "2023-10-04T11:16:19Z",
                //             "content": "A Florida-based company called X Social Media has accused Elon Musks X Corp. of trademark and service mark infringement. With SpaceX, AI venture xAI (not to mention the brief existence of banking sta… [+3826 chars]"
                //         },
                //         {
                //             "source": {
                //                 "id": "engadget",
                //                 "name": "Engadget"
                //             },
                //             "author": "Kris Holt",
                //             "title": "ChatGPT now supports voice chats and image-based queries",
                //             "description": "ChatGPT\r\n is getting some significant updates that will enable the chatbot to deal with voice commands and image-based queries. Users will be able to have a voice conversation with ChatGPT on Android and iOS and to feed images into it on all platforms. OpenAI…",
                //             "url": "https://www.engadget.com/chatgpt-now-supports-voice-chats-and-image-based-queries-144718179.html",
                //             "urlToImage": "https://s.yimg.com/ny/api/res/1.2/PQBaFh3MRJbd757aPBc8kw--/YXBwaWQ9aGlnaGxhbmRlcjt3PTEyMDA7aD04MDA-/https://s.yimg.com/os/creatr-uploaded-images/2023-08/621d37f0-3bdc-11ee-a43f-30af0458ac79",
                //             "publishedAt": "2023-09-25T14:47:18Z",
                //             "content": "ChatGPT\r\n is getting some significant updates that will enable the chatbot to deal with voice commands and image-based queries. Users will be able to have a voice conversation with ChatGPT on Android… [+4049 chars]"
                //         },
                //         {
                //             "source": {
                //                 "id": null,
                //                 "name": "Hipertextual"
                //             },
                //             "author": "Luis Miranda",
                //             "title": "‘Forza Motorsport’ análisis: un regreso triunfal",
                //             "description": "Forza Motorsport es uno de los lanzamientos más importantes para Microsoft en 2023. No solo porque es el reboot de una de las franquicias de carreras más populares, sino porque Xbox necesita con urgencia un éxito en su catálogo first party. La buena noticia e…",
                //             "url": "http://hipertextual.com/2023/10/forza-motorsport-analisis-xbox-caracteristicas-precio",
                //             "urlToImage": "https://i0.wp.com/imgs.hipertextual.com/wp-content/uploads/2023/10/Forza-Motorsport-Review00-1.jpg?fit=1920%2C1080&quality=50&strip=all&ssl=1",
                //             "publishedAt": "2023-10-04T07:01:00Z",
                //             "content": "Forza Motorsport es uno de los lanzamientos más importantes para Microsoft en 2023. No solo porque es el reboot de una de las franquicias de carreras más populares, sino porque Xbox necesita con urge… [+10641 chars]"
                //         },
                //         {
                //             "source": {
                //                 "id": null,
                //                 "name": "Windows.net"
                //             },
                //             "author": null,
                //             "title": "The Project Gutenberg Open Audiobook Collection",
                //             "description": "Thousands of free and open audiobooks powered by Microsoft AI",
                //             "url": "https://marhamilresearch4.blob.core.windows.net/gutenberg-public/Website/index.html",
                //             "urlToImage": "https://marhamilresearch4.blob.core.windows.net/gutenberg-public/Graphics/Project_Gutenberg_logo%20(1).svg",
                //             "publishedAt": "2023-09-11T12:06:28Z",
                //             "content": "Thousands of free and open audiobooks powered by Microsoft AI"
                //         },
                //         {
                //             "source": {
                //                 "id": null,
                //                 "name": "heise online"
                //             },
                //             "author": "Daniel AJ Sokolov",
                //             "title": "Microsoft Network bezeichnet verstorbenen Sportler als \"nutzlos\"",
                //             "description": "\"Brandon Hunter useless at 42\", titelte Microsoft Network (MSN). Der Basketballspieler starb einen frühen Tod. Microsofts Anstand auch.​",
                //             "url": "https://www.heise.de/meinung/Microsoft-Network-bezeichnet-verstorbenen-Sportler-als-nutzlos-9305987.html?wt_mc=rss.red.ho.ho.atom.beitrag.beitrag",
                //             "urlToImage": "https://heise.cloudimg.io/bound/1200x1200/q85.png-lossy-85.webp-lossy-85.foil1/_www-heise-de_/imgs/18/4/3/0/3/1/9/2/Warnschild_Gefahr_seichtes_Wasser_Strand_1750-fbc8fe9fe64ebb83.jpg",
                //             "publishedAt": "2023-09-14T19:21:00Z",
                //             "content": "\"Brandon Hunter useless at 42\" lautete die Schlagzeile eines Nachrufs im Microsoft Network (MSN). Zu Deutsch etwa: Brandon Hunter nutzlos im Alter von 42 Jahren. Hunter war einst Profi-Basketballspie… [+2851 chars]"
                //         },
                //         {
                //             "source": {
                //                 "id": null,
                //                 "name": "heise online"
                //             },
                //             "author": "Dirk Knop",
                //             "title": "Microsoft: Powertoys 0.74.1 mit kleineren Fehlerkorrekturen",
                //             "description": "Microsoft hat die Version 0.74.1 der Powertoys für Windows herausgegeben. Darin korrigieren die Entwickler einige Fehler.",
                //             "url": "https://www.heise.de/news/Microsoft-Powertoys-0-74-1-mit-kleineren-Fehlerkorrekturen-9324660.html",
                //             "urlToImage": "https://heise.cloudimg.io/bound/1200x1200/q85.png-lossy-85.webp-lossy-85.foil1/_www-heise-de_/imgs/18/4/3/1/3/2/2/5/heise_newsroom_A_Laptop_showing_Microsoft_Windows_Logo_on_the_d_c52cfe87-d0c0-41e3-ab8b-0a6bc2b021e5-7e211d6f25f49d42.png",
                //             "publishedAt": "2023-10-04T10:36:00Z",
                //             "content": "Microsoft hat in der Nacht zum Mittwoch die aktualisierte Fassung 0.74.1 der Powertoys veröffentlicht. Bei den nützlichen Helferlein haben die Entwickler einige Fehler ausgebessert, die seit der Verö… [+2200 chars]"
                //         },
                //         {
                //             "source": {
                //                 "id": null,
                //                 "name": "heise online"
                //             },
                //             "author": "Sven Scharpe",
                //             "title": "Microsoft beendet Support für Smartphone Surface Duo",
                //             "description": "Die erste Generation des Surface Duo wird laut Microsoft keine Updates mehr erhalten. 2024 wird auch das Duo 2 beerdigt.",
                //             "url": "https://www.heise.de/news/Microsoft-beendet-Support-fuer-Smartphone-Surface-Duo-9303400.html",
                //             "urlToImage": "https://heise.cloudimg.io/bound/1200x1200/q85.png-lossy-85.webp-lossy-85.foil1/_www-heise-de_/imgs/18/4/3/0/1/7/9/7/surf-223261a88997daa8.jpg",
                //             "publishedAt": "2023-09-14T08:34:00Z",
                //             "content": "Das Surface Duo 1 ist jetzt drei Jahre auf dem Markt und hat damit offiziell das Ende des Supports erreicht. Die Kundschaft wird also in Zukunft für das Gerät keine Sicherheitsupdates oder neue Andro… [+1257 chars]"
                //         },
                //         {
                //             "source": {
                //                 "id": null,
                //                 "name": "Hipertextual"
                //             },
                //             "author": "Hipertextual (Redacción)",
                //             "title": "Oferta limitada: licencia original de Office 2021 por sólo 13,65 euros y Windows 10 por 7,25 euros en Keysfan",
                //             "description": "Así es, en la promoción de mitad de año de Keysfan puedes comprar MS Office 2021 por sólo 13,65 euros. Ten en mente que el precio oficial en la tienda de Microsoft es de más de 400 euros por lo que la oferta es increíblemente buena. Además, esta oferta incluy…",
                //             "url": "http://hipertextual.com/2023/10/oferta-licencia-office-windows",
                //             "urlToImage": "https://imgs.hipertextual.com/wp-content/uploads/2023/10/ed-hardie-xG02JzIBf7o-unsplash-1-scaled.jpg",
                //             "publishedAt": "2023-10-10T14:38:35Z",
                //             "content": "Así es, en la promoción de mitad de año de Keysfan puedes comprar MS Office 2021 por sólo 13,65 euros. Ten en mente que el precio oficial en la tienda de Microsoft es de más de 400 euros por lo que l… [+3778 chars]"
                //         },
                //         {
                //             "source": {
                //                 "id": null,
                //                 "name": "Xataka.com"
                //             },
                //             "author": "Javier Marquez",
                //             "title": "Panos Panay abandona Microsoft: el responsable de Windows y Surface deja la compañía tras casi 20 años",
                //             "description": "Microsoft ha anunciado este lunes que Panos Panay, el director de Windows y Surace, deja la compañía tras más de 20 años. El ejecutivo empezó a trabajar en el gigante de Redmond en 2004 en una de las divisiones de software. Más tarde se convirtió en un talent…",
                //             "url": "https://www.xataka.com/empresas-y-economia/panos-panay-abandona-microsoft-responsable-windows-surface-deja-compania-20-anos",
                //             "urlToImage": "https://i.blogs.es/d31748/panos-panay-portada/840_560.png",
                //             "publishedAt": "2023-09-18T14:35:22Z",
                //             "content": "Microsoft ha anunciado este lunes que Panos Panay, el director de Windows y Surace, deja la compañía tras más de 20 años. El ejecutivo empezó a trabajar en el gigante de Redmond en 2004 en una de las… [+480 chars]"
                //         },
                //         {
                //             "source": {
                //                 "id": null,
                //                 "name": "Boing Boing"
                //             },
                //             "author": "Boing Boing's Shop",
                //             "title": "Microsoft Office and Windows 11 Pro are the perfect pair, and you can have 'em both for a mere $49.97!",
                //             "description": "TL;DR: No matter what kind of work you do, this All-in-One Microsoft Office Pro 2021 for Windows: Lifetime License and Windows 11 Pro Bundle will help you work more efficiently than ever before, and it'll save you money at the deeply discounted price of just …",
                //             "url": "https://boingboing.net/2023/10/03/microsoft-office-and-windows-11-pro-are-the-perfect-pair-and-you-can-have-em-both-for-a-mere-49-97.html",
                //             "urlToImage": "https://i0.wp.com/boingboing.net/wp-content/uploads/2023/09/Boing-Boing-MSO-w11.jpeg?fit=1200%2C800&ssl=1",
                //             "publishedAt": "2023-10-03T21:46:58Z",
                //             "content": "TL;DR: No matter what kind of work you do, this All-in-One Microsoft Office Pro 2021 for Windows: Lifetime License and Windows 11 Pro Bundle will help you work more efficiently than ever before, and … [+2197 chars]"
                //         },
                //         {
                //             "source": {
                //                 "id": null,
                //                 "name": "CNET"
                //             },
                //             "author": "Katelyn Chedraoui",
                //             "title": "Amazon Bets Big (Up to $4 Billion Big) on Generative AI in Deal With Anthropic - CNET",
                //             "description": "The partnership is the latest way the retail giant is investing in AI.",
                //             "url": "https://www.cnet.com/tech/amazon-bets-big-up-to-4-billion-big-on-generative-ai-in-deal-with-anthropic/",
                //             "urlToImage": "https://www.cnet.com/a/img/resize/f12e5b62154b279b00607fd2785eeb666dc320bc/hub/2022/04/15/283fff4f-ebf7-4365-9c40-421d7cff35fd/amazon-logo-2022-094.jpg?auto=webp&fit=crop&height=675&width=1200",
                //             "publishedAt": "2023-09-25T18:28:00Z",
                //             "content": "Amazon is making big moves in artificial intelligence. The online retail giant on Monday said that it's investing up to $4 billion in a partnership with AI startup Anthropic to aid the development of… [+2541 chars]"
                //         },
                //         {
                //             "source": {
                //                 "id": null,
                //                 "name": "heise online"
                //             },
                //             "author": "Andreas Knobloch",
                //             "title": "Microsoft-Produktchef auf dem Sprung zu Amazon",
                //             "description": "Microsofts ehemaliger Windows- und Surface-Chef Panos Panay wechselt angeblich zu Amazon. Dort soll er die Abteilung der Echo- und Alexa-Produkte leiten.",
                //             "url": "https://www.heise.de/news/Microsoft-Produktchef-auf-dem-Sprung-zu-Amazon-9309133.html",
                //             "urlToImage": "https://heise.cloudimg.io/bound/1200x1200/q85.png-lossy-85.webp-lossy-85.foil1/_www-heise-de_/imgs/18/4/3/0/4/8/6/5/urn-newsml-dpa-com-20090101-140521-99-01393_large_4_3-a7780aa129a815ab.jpg",
                //             "publishedAt": "2023-09-18T21:09:00Z",
                //             "content": "Microsofts Produktchef Panos Panay wird zum Onlinehändler Amazon wechseln. Dort soll er die umfangreiche Geräte-Sparte leiten. Das berichtet die US-Nachrichtenagentur Bloomberg am Montag.\r\nDemnach ha… [+2698 chars]"
                //         },
                //         {
                //             "source": {
                //                 "id": "wired",
                //                 "name": "Wired"
                //             },
                //             "author": "Lily Hay Newman, Matt Burgess",
                //             "title": "Chinese Hackers Are Hiding in Routers in the US and Japan",
                //             "description": "Plus: Stolen US State Department emails, $20 million zero-day flaws, and controversy over the EU’s message-scanning law.",
                //             "url": "https://www.wired.com/story/china-blacktech-router-hack/",
                //             "urlToImage": "https://media.wired.com/photos/651764a084712a7a4a0cd666/191:100/w_1280,c_limit/Router-Hacking-Security-Roundup-Security-480550635.jpg",
                //             "publishedAt": "2023-09-30T13:00:00Z",
                //             "content": "WIRED broke the news on Wednesday that SoundThinking, the company behind the gunshot-detection system ShotSpotter, is acquiring some assetsincluding patents, customers, and employeesfrom the firm Geo… [+4918 chars]"
                //         },
                //         {
                //             "source": {
                //                 "id": null,
                //                 "name": "Xataka.com"
                //             },
                //             "author": "Juan Carlos López",
                //             "title": "Microsoft Copilot nos promete que Windows 11 será más seguro que nunca. Así es como pretende conseguirlo",
                //             "description": "Windows 11 recibirá la actualización más importante de su historia el próximo 26 de septiembre. Copilot, el asistente de inteligencia artificial de Microsoft, estará plenamente integrado en este sistema operativo a partir de ese día, aunque no llegará solo a …",
                //             "url": "https://www.xataka.com/robotica-e-ia/microsoft-copilot-nos-promete-que-windows-11-sera-seguro-que-nunca-asi-como-pretende-conseguirlo",
                //             "urlToImage": "https://i.blogs.es/8b684f/windowshello-ap/840_560.jpeg",
                //             "publishedAt": "2023-09-21T21:00:48Z",
                //             "content": "Windows 11 recibirá la actualización más importante de su historia el próximo 26 de septiembre. Copilot, el asistente de inteligencia artificial de Microsoft, estará plenamente integrado en este sist… [+3280 chars]"
                //         },
                //         {
                //             "source": {
                //                 "id": null,
                //                 "name": "VentureBeat"
                //             },
                //             "author": "Sean Michael Kerner",
                //             "title": "Cloudflare ignites AI platform efforts with serverless inference, vectorize database and AI gateway",
                //             "description": "Cloudflare's new Workers AI service, provides a serverless capability for delivering AI inference models around the world.",
                //             "url": "https://venturebeat.com/ai/cloudflare-ignites-ai-platform-efforts-with-serverless-inference-vectorize-database-and-ai-gateway/",
                //             "urlToImage": "https://venturebeat.com/wp-content/uploads/2023/09/nuneybits_Cloudflare_as_an_abstrat_painting_4206c060-f26c-4ece-b84a-f2a6d09bb6a5-transformed.png?w=1200&strip=all",
                //             "publishedAt": "2023-09-27T13:00:00Z",
                //             "content": "VentureBeat presents: AI Unleashed - An exclusive executive event for enterprise data leaders. Network and learn with industry peers.Learn More\r\nHow can you rapidly deploy an AI model around the word… [+1442 chars]"
                //         },
                //         {
                //             "source": {
                //                 "id": null,
                //                 "name": "Hipertextual"
                //             },
                //             "author": "Gabriel Erard",
                //             "title": "¿Windows 12 se lanzará bajo suscripción?",
                //             "description": "Si Microsoft no cambia sus planes a último momento, Windows 12 llegaría en 2024 y con una sorpresa: podría ofrecerse bajo suscripción. Esto se desprende de lo publicado por el medio alemán Deskmodder, que encontró referencias a dicho método de distribución en…",
                //             "url": "http://hipertextual.com/2023/10/windows-12-suscripcion",
                //             "urlToImage": "https://imgs.hipertextual.com/wp-content/uploads/2023/10/windows-me4HT8AX4Ls-unsplash-scaled.jpg",
                //             "publishedAt": "2023-10-06T14:42:11Z",
                //             "content": "Si Microsoft no cambia sus planes a último momento, Windows 12llegaría en 2024 y con una sorpresa: podría ofrecerse bajo suscripción. Esto se desprende de lo publicado por el medio alemán Deskmodder,… [+3331 chars]"
                //         },
                //         {
                //             "source": {
                //                 "id": null,
                //                 "name": "Windows Central"
                //             },
                //             "author": "zac.bowden@futurenet.com (Zac Bowden)",
                //             "title": "Windows Central Podcast #324: WordPad dies, Windows 11 23H2 reviewed, and more",
                //             "description": "On this week's episode, Dan and Zac discuss Microsoft killing off Windows WordPad, Microsoft Paint's new AI feature, how a cheap MacBook could hurt Microsoft, and more!",
                //             "url": "https://www.windowscentral.com/microsoft/windows-central-podcast-324-wordpad-dies-windows-11-23h2-reviewed-and-more",
                //             "urlToImage": "https://cdn.mos.cms.futurecdn.net/idZQX52DTMJZ3rh9BeuMpX-1200-80.jpg",
                //             "publishedAt": "2023-09-12T22:15:09Z",
                //             "content": "Windows Central is part of Future US Inc, an international media group and leading digital publisher. Visit our corporate site.\r\n©\r\nFuture US, Inc. Full 7th Floor, 130 West 42nd Street,\r\nNew York,\r\nN… [+7 chars]"
                //         },
                //         {
                //             "source": {
                //                 "id": null,
                //                 "name": "9to5Mac"
                //             },
                //             "author": "Zac Hall",
                //             "title": "Apple profits more from Bing existing than Bing does, claims Microsoft exec",
                //             "description": "While Alphabet is busy trying to convince the government that Google doesn’t stifle search innovation, Microsoft is making an interesting point about Bing and Apple. In Microsoft’s view, Bing benefits Apple financially more than it benefits Microsoft.\n\n\n\n mor…",
                //             "url": "https://9to5mac.com/2023/09/27/apple-bing-profit/",
                //             "urlToImage": "https://i0.wp.com/9to5mac.com/wp-content/uploads/sites/6/2022/12/bing.jpg?resize=1200%2C628&quality=82&strip=all&ssl=1",
                //             "publishedAt": "2023-09-27T16:21:22Z",
                //             "content": "While Alphabet is busy trying to convince the government that Google doesn’t stifle search innovation, Microsoft is making an interesting point about Bing and Apple. In Microsoft’s view, Bing benefit… [+1369 chars]"
                //         },
                //         {
                //             "source": {
                //                 "id": null,
                //                 "name": "Windows Central"
                //             },
                //             "author": "zac.bowden@futurenet.com (Zac Bowden)",
                //             "title": "Windows Central Podcast #326: The biggest Microsoft leak in history",
                //             "description": "On this week's episode, Dan and Zac discuss Microsoft killing off Windows WordPad, Microsoft Paint's new AI feature, how a cheap MacBook could hurt Microsoft, and more!",
                //             "url": "https://www.windowscentral.com/microsoft/windows-central-podcast-326-the-biggest-microsoft-leak-in-history",
                //             "urlToImage": "https://cdn.mos.cms.futurecdn.net/cEsTwQic7MgLiFGzKscTaW-1200-80.png",
                //             "publishedAt": "2023-10-04T12:25:11Z",
                //             "content": "Windows Central is part of Future US Inc, an international media group and leading digital publisher. Visit our corporate site.\r\n©\r\nFuture US, Inc. Full 7th Floor, 130 West 42nd Street,\r\nNew York,\r\nN… [+7 chars]"
                //         },
                //         {
                //             "source": {
                //                 "id": "fox-news",
                //                 "name": "Fox News"
                //             },
                //             "author": "Kurt Knutsson, CyberGuy Report",
                //             "title": "How to smartly organize your photos on a PC",
                //             "description": "You can organize your digital image library on your PC with a number of programs and tools, including Microsoft Photos, Google Photos, ACDSee and digiKam.",
                //             "url": "https://www.foxnews.com/tech/how-smartly-organize-your-photos-pc",
                //             "urlToImage": "https://static.foxnews.com/foxnews.com/content/uploads/2023/10/1-MICROSOFT-PHOTOS.jpg",
                //             "publishedAt": "2023-10-03T18:30:29Z",
                //             "content": "Many of us have thousands of photos on our PCs, which can make it way more difficult to get organized. I find it to be super daunting when looking at a cluttered device; however, getting organized do… [+7509 chars]"
                //         },
                //         {
                //             "source": {
                //                 "id": null,
                //                 "name": "Gizmodo.com"
                //             },
                //             "author": "Kyle Barr",
                //             "title": "Judge Says Google Can't Keep Hiding Its Dealings During DOJ Antitrust Trial",
                //             "description": "Google has been rather miffed that all its dirty laundry is being aired in public as it tries to fight off federal allegations the company has been monopolizing its digital ecosystem. After nearly a week of trial documents going offline, a judge has again all…",
                //             "url": "https://gizmodo.com/judge-says-google-cant-keep-hiding-docs-antitrust-1850877990",
                //             "urlToImage": "https://i.kinja-img.com/gawker-media/image/upload/c_fill,f_auto,fl_progressive,g_center,h_675,pg_1,q_80,w_1200/4f05abccb10f23153805a3f666649331.jpg",
                //             "publishedAt": "2023-09-27T16:25:00Z",
                //             "content": "Google has been rather miffed that all its dirty laundry is being aired in public as it tries to fight off federal allegations the company has been monopolizing its digital ecosystem. After nearly a … [+2935 chars]"
                //         },
                //         {
                //             "source": {
                //                 "id": "ign",
                //                 "name": "IGN"
                //             },
                //             "author": "Ryan Dinsdale",
                //             "title": "Microsoft Releasing Sexy Gold Shadow Xbox Wireless Controller",
                //             "description": "Microsoft has revealed a sexy Gold Shadow special edition Xbox Wireless Controller, reminiscent of the Shadow range released for the Xbox One.",
                //             "url": "https://www.ign.com/articles/microsoft-releasing-sexy-gold-shadow-xbox-wireless-controller",
                //             "urlToImage": "https://assets-prd.ignimgs.com/2023/10/03/shadow-1696347687602.jpg?width=1280",
                //             "publishedAt": "2023-10-03T16:59:33Z",
                //             "content": "Microsoft has revealed a sexy Gold Shadow special edition Xbox Wireless Controller, reminiscent of the Shadow range released for the Xbox One.\r\nRevealed on the Xbox Store, the controller features a b… [+1059 chars]"
                //         },
                //         {
                //             "source": {
                //                 "id": "business-insider",
                //                 "name": "Business Insider"
                //             },
                //             "author": "Kali Hays",
                //             "title": "Rev joins a long list of tech companies from Instacart to Microsoft, that are rushing to update terms to use people's data to train AI",
                //             "description": "More companies are quietly giving themselves permission to use consumer data to train generative AI models and tools.",
                //             "url": "https://www.businessinsider.com/tech-updated-terms-to-use-customer-data-to-train-ai-2023-9",
                //             "urlToImage": "https://i.insider.com/6501fe85992da60019ebafa0?width=1200&format=jpeg",
                //             "publishedAt": "2023-09-13T21:47:45Z",
                //             "content": "OpenAI CEO Sam Altman at the Sun Valley conference this year.Kevin Dietsch/Getty Images\r\n<ul><li>More companies are quietly updating privacy policies to use collected user data to train AI models.</l… [+7132 chars]"
                //         },
                //         {
                //             "source": {
                //                 "id": "ars-technica",
                //                 "name": "Ars Technica"
                //             },
                //             "author": "Ashley Belanger",
                //             "title": "4chan users manipulate AI tools to unleash torrent of racist images",
                //             "description": "AI tools are \"supercharging\" racists online, report says.",
                //             "url": "https://arstechnica.com/tech-policy/2023/10/4chan-pushing-bing-dall-e-as-quick-methods-to-spread-racist-images/",
                //             "urlToImage": "https://cdn.arstechnica.net/wp-content/uploads/2023/10/4chan-meme-firestarter-760x380.jpg",
                //             "publishedAt": "2023-10-05T21:32:37Z",
                //             "content": "37 with \r\nDespite leading AI companies' attempts to block users from turning AI image generators into engines of racist content, many 4chan users are still turning to these tools to \"quickly flood th… [+3576 chars]"
                //         },
                //         {
                //             "source": {
                //                 "id": null,
                //                 "name": "MacRumors"
                //             },
                //             "author": "Tim Hardwick",
                //             "title": "Apple Considered Making DuckDuckGo Default Search Engine in Safari Private Browsing Mode",
                //             "description": "Back in 2018, Apple held talks with DuckDuckGo to replace Google as the default search engine in private browsing mode, but ultimately rejected the idea, according to transcripts unsealed by the judge overseeing the US government's antitrust trial against Goo…",
                //             "url": "https://www.macrumors.com/2023/10/05/apple-considered-duckduckgo-default-private-search/",
                //             "urlToImage": "https://images.macrumors.com/t/ZhDWEwW6MsVZG1ON4fezVSJoqho=/1600x/article-new/2020/06/duckduckgo.jpg",
                //             "publishedAt": "2023-10-05T07:20:30Z",
                //             "content": "Back in 2018, Apple held talks with DuckDuckGo to replace Google as the default search engine in private browsing mode, but ultimately rejected the idea, according to transcripts unsealed by the judg… [+2034 chars]"
                //         },
                //         {
                //             "source": {
                //                 "id": null,
                //                 "name": "Gizmodo.com"
                //             },
                //             "author": "Nikki Main",
                //             "title": "Amazon Invests Up to $4 Billion in OpenAI Competitor Anthropic",
                //             "description": "In its latest bid to adopt artificial intelligence technology, Amazon announced on Monday that it is investing a bundle in OpenAI competitor Anthropic. The investment will reach up to $4 billion, making Amazon Web Services (AWS) the primary cloud provider for…",
                //             "url": "https://gizmodo.com/amazon-invests-4-billion-dollars-in-anthropic-ai-1850870060",
                //             "urlToImage": "https://i.kinja-img.com/gawker-media/image/upload/c_fill,f_auto,fl_progressive,g_center,h_675,pg_1,q_80,w_1200/16ca71ba4c1d8efd43485ef67f5bf6ce.jpg",
                //             "publishedAt": "2023-09-25T14:31:06Z",
                //             "content": "In its latest bid to adopt artificial intelligence technology, Amazon announced on Monday that it is investing a bundle in OpenAI competitor Anthropic. The investment will reach up to $4 billion, mak… [+3489 chars]"
                //         },
                //         {
                //             "source": {
                //                 "id": null,
                //                 "name": "Slashdot.org"
                //             },
                //             "author": "msmash",
                //             "title": "Google Says It's No. 1 Search Tool Because Users Prefer It to Rivals",
                //             "description": "Companies choose Alphabet's Google as the default search engine for their browsers and smartphones because it is the best one, and not because of a lack of competition, a Google lawyer said Tuesday at the start of a high-stakes antitrust trial in Washington. …",
                //             "url": "https://tech.slashdot.org/story/23/09/12/203233/google-says-its-no-1-search-tool-because-users-prefer-it-to-rivals",
                //             "urlToImage": "https://a.fsdn.com/sd/topics/topicgoogle_fb.gif",
                //             "publishedAt": "2023-09-12T20:00:00Z",
                //             "content": "Consumers use Google \"because it delivers value to them, not because they have to,\" John Schmidtlein, a partner at Williams &amp; Connolly LLP who is representing the company, said during his opening… [+742 chars]"
                //         },
                //         {
                //             "source": {
                //                 "id": null,
                //                 "name": "Slashdot.org"
                //             },
                //             "author": "msmash",
                //             "title": "AI's Costly Buildup Could Make Early Products a Hard Sell",
                //             "description": "Microsoft, Google and others experiment with how to produce, market and charge for new tools. From a report: Microsoft has lost money on one of its first generative AI products, said a person with knowledge of the figures. It and Google are now launching AI-b…",
                //             "url": "https://slashdot.org/story/23/10/09/162259/ais-costly-buildup-could-make-early-products-a-hard-sell",
                //             "urlToImage": "https://a.fsdn.com/sd/topics/ai_64.png",
                //             "publishedAt": "2023-10-09T16:03:00Z",
                //             "content": "Microsoft has lost money on one of its first generative AI products, said a person with knowledge of the figures. It and Google are now launching AI-backed upgrades to their software with higher pric… [+1844 chars]"
                //         },
                //         {
                //             "source": {
                //                 "id": null,
                //                 "name": "Windows Central"
                //             },
                //             "author": "sendicott47@outlook.com (Sean Endicott)",
                //             "title": "Microsoft unveils unified Copilot that extends across Bing, Edge, and Windows",
                //             "description": "Microsoft just announced Copilot, which will be available on Windows, Edge, and Microsoft 365.",
                //             "url": "https://www.windowscentral.com/microsoft/microsoft-unveils-unified-copilot-that-extends-across-bing-edge-and-windows",
                //             "urlToImage": "https://cdn.mos.cms.futurecdn.net/RZTfqBF55sFP2iUYN9Q6UE-1200-80.jpg",
                //             "publishedAt": "2023-09-21T14:20:38Z",
                //             "content": "<ul><li>Microsoft just announced Copilot, which will work with several of the company's apps and services.</li><li>Microsoft has had separate versions of Copilot before today, but this unified Copilo… [+775 chars]"
                //         },
                //         {
                //             "source": {
                //                 "id": null,
                //                 "name": "Digital Trends"
                //             },
                //             "author": "Fionna Agomuoh",
                //             "title": "Hackers are sending malware through seemingly innocent Microsoft Teams messages",
                //             "description": "Microsoft Teams is subject to a new phishing malware that disguises itself as a convincing notice about company vacation time.",
                //             "url": "https://www.digitaltrends.com/computing/microsoft-teams-phishing-scam-dupes-workers-on-vacation-time/",
                //             "urlToImage": "https://www.digitaltrends.com/wp-content/uploads/2023/05/MicrosoftTeams-image-1.jpg?resize=1200%2C630&p=1",
                //             "publishedAt": "2023-09-11T22:13:32Z",
                //             "content": "Hackers are getting so sophisticated with malware that they are making links look like a notice about company vacation time.\r\nA new phishing scam called “DarkGate Loader” has been uncovered that targ… [+2548 chars]"
                //         },
                //         {
                //             "source": {
                //                 "id": null,
                //                 "name": "Digital Trends"
                //             },
                //             "author": "Monica J. White",
                //             "title": "Everything Microsoft didn’t announce at its 2023 Surface event",
                //             "description": "Microsoft has just unveiled lots of new products, from Surface laptops to the AI-powered Copilot -- but some products were missing from the lineup.",
                //             "url": "https://www.digitaltrends.com/computing/everything-microsoft-didnt-announce-september-surface-event-2023/",
                //             "urlToImage": "https://www.digitaltrends.com/wp-content/uploads/2023/09/surfacelaptopgo301.jpg?resize=1200%2C630&p=1",
                //             "publishedAt": "2023-09-22T13:00:45Z",
                //             "content": "Microsoft unveiled several new products during its 2023 Surface event. We got lots of updates about Windows Copilot and other AI-driven software upgrades, as well as plenty of hardware, including the… [+5750 chars]"
                //         },
                //         {
                //             "source": {
                //                 "id": null,
                //                 "name": "Xataka.com"
                //             },
                //             "author": "Javier Pastor",
                //             "title": "GitHub Copilot es un milagro para los programadores. Pero Microsoft pierde 20 dólares/mes por usuario con él",
                //             "description": "Los desarrolladores han recibido a GitHub Copilot con los brazos abiertos. El asistente de IA que les ayuda a programar se ha convertido en la gran demostración de lo mucho que esta tecnología puede ayudar en ciertos ámbitos profesionales, pero ahora se ha de…",
                //             "url": "https://www.xataka.com/robotica-e-ia/github-copilot-milagro-para-programadores-microsoft-pierde-20-dolares-mes-usuario",
                //             "urlToImage": "https://i.blogs.es/2e6cce/coding1/840_560.jpeg",
                //             "publishedAt": "2023-10-10T10:01:14Z",
                //             "content": "Los desarrolladores han recibido a GitHub Copilot con los brazos abiertos. El asistente de IA que les ayuda a programar se ha convertido en la gran demostración de lo mucho que esta tecnología puede … [+2819 chars]"
                //         },
                //         {
                //             "source": {
                //                 "id": "business-insider",
                //                 "name": "Business Insider"
                //             },
                //             "author": "Theron Mohamed",
                //             "title": "Warren Buffett's $123 billion fortune makes him richer than Larry Page - and he's closing in on Bill Gates and Larry Ellison",
                //             "description": "Warren Buffett is now richer than Larry Page, Sergey Brin, Steve Ballmer, and Mark Zuckerberg, as Berkshire Hathaway stock hits record highs.",
                //             "url": "https://markets.businessinsider.com/news/stocks/warren-buffett-berkshire-stock-wealth-page-gates-ellison-musk-billionaires-2023-9",
                //             "urlToImage": "https://i.insider.com/65017e8c1afe8f0019e951ae?width=1200&format=jpeg",
                //             "publishedAt": "2023-09-13T10:09:06Z",
                //             "content": "Warren Buffett.AP Images\r\n<ul>\n<li>Warren Buffett surged past Google cofounder Larry Page in the wealth rankings on Tuesday.</li>\n<li>Buffett's fortune grew to $123 billion on the day, while Page's n… [+2345 chars]"
                //         },
                //         {
                //             "source": {
                //                 "id": "business-insider",
                //                 "name": "Business Insider"
                //             },
                //             "author": "Joseph Wilkins",
                //             "title": "Warren Buffett's Berkshire Hathaway sees its market value surge to a new record of almost $800 billion",
                //             "description": "Monday's movements means that Buffett has now administered a more-than 4,300,000% gain in the value of Berkshire shares since he became CEO in 1965.",
                //             "url": "https://markets.businessinsider.com/news/stocks/warren-buffetts-berkshire-hathaway-hits-record-market-cap-800-billion-2023-9",
                //             "urlToImage": "https://i.insider.com/65002e884717fd0019fc875b?width=1200&format=jpeg",
                //             "publishedAt": "2023-09-12T10:34:24Z",
                //             "content": "Warren Buffett, chairman and CEO of Berkshire Hathaway, right, listens to Microsoft founder and Berkshire board member Bill Gates during an interview with Liz Claman of the Fox Business Network in Om… [+2143 chars]"
                //         },
                //         {
                //             "source": {
                //                 "id": "business-insider",
                //                 "name": "Business Insider"
                //             },
                //             "author": "Lakshmi Varanasi",
                //             "title": "Lachlan Murdoch backs Fox board role for former Australian PM who called climate change science 'absolute crap'",
                //             "description": "In one of his first moves after taking over from his father Rupert, Lachlan Murdoch backed the appointment of Tony Abbott to the media giant's board.",
                //             "url": "https://www.businessinsider.com/lachlan-murdoch-tony-abbott-former-australian-pm-fox-board-2023-9",
                //             "urlToImage": "https://i.insider.com/650f0031e453d50019f7f99a?width=1200&format=jpeg",
                //             "publishedAt": "2023-09-23T17:18:32Z",
                //             "content": "Former Australian prime minister Tony Abbott has been nominated to the Fox board.Rick Rycroft/AP\r\n<ul>\n<li>Former Australian prime minister Tony Abbott has been nominated to Fox Corp's board of direc… [+2454 chars]"
                //         },
                //         {
                //             "source": {
                //                 "id": "wired",
                //                 "name": "Wired"
                //             },
                //             "author": "Will Knight",
                //             "title": "Six Months Ago Elon Musk Called for a Pause on AI. Instead Development Sped Up",
                //             "description": "Earlier this year, prominent AI and tech experts signed a letter calling for a halt to advanced AI development. When WIRED checked back in, some signatories said they had never expected it to work.",
                //             "url": "https://www.wired.com/story/fast-forward-elon-musk-letter-pause-ai-development/",
                //             "urlToImage": "https://media.wired.com/photos/6514cbbb15ba797e3efc13f2/191:100/w_1280,c_limit/Business-Elon-Musk-Pause-AI-1211442372.jpg",
                //             "publishedAt": "2023-09-28T16:01:08Z",
                //             "content": "Six months ago this week, many prominent AI researchers, engineers, and entrepreneurs signed an open letter calling for a six-month pause on development of AI systems more capable than OpenAIs latest… [+3956 chars]"
                //         },
                //         {
                //             "source": {
                //                 "id": "business-insider",
                //                 "name": "Business Insider"
                //             },
                //             "author": "William Antonelli",
                //             "title": "How to play Starfield even if you don't own an Xbox or PC",
                //             "description": "Starfield is available on Xbox, and on computers and mobile devices through Steam and Xbox Game Pass.",
                //             "url": "https://www.businessinsider.com/guides/tech/how-to-play-starfield",
                //             "urlToImage": "https://i.insider.com/65021b39992da60019ebd691?width=1200&format=jpeg",
                //             "publishedAt": "2023-09-14T15:30:01Z",
                //             "content": "When you buy through our links, Insider may earn an affiliate commission. Learn more\r\nStarfield is the latest open-world role-playing game (RPG) from Bethesda, the game studio behind popular titles l… [+6869 chars]"
                //         },
                //         {
                //             "source": {
                //                 "id": null,
                //                 "name": "Www.wiz.io"
                //             },
                //             "author": null,
                //             "title": "38TB of data accidentally exposed by Microsoft AI researchers",
                //             "description": "Wiz Research found a data exposure incident on Microsoft’s AI GitHub repository, including over 30,000 internal Microsoft Teams messages – all caused by one misconfigured SAS token",
                //             "url": "https://www.wiz.io/blog/38-terabytes-of-private-data-accidentally-exposed-by-microsoft-ai-researchers",
                //             "urlToImage": "https://www.datocms-assets.com/75231/1695038585-azure_sas.png",
                //             "publishedAt": "2023-09-18T14:30:09Z",
                //             "content": "Executive summary \r\n<ul><li>Microsofts AI research team, while publishing a bucket of open-source training data on GitHub, accidentally exposed 38 terabytes of additional private data including a dis… [+14434 chars]"
                //         },
                //         {
                //             "source": {
                //                 "id": null,
                //                 "name": "Ctrl.blog"
                //             },
                //             "author": "Daniel Aleksandersen",
                //             "title": "Microsoft has not stopped forcing Edge on Windows 11 users",
                //             "description": "Microsoft announces vague changes to the default web browser setting for Windows Insider. Nothing but wishful thinking. Still force-opens web links in Edge.",
                //             "url": "https://www.ctrl.blog/entry/windows-system-components-default-edge.html",
                //             "urlToImage": "https://www.ctrl.blog/media/hero/microsoft-edge.1280x720.png",
                //             "publishedAt": "2023-09-11T00:25:04Z",
                //             "content": "Microsoft published a blog post on the Windows Insider Blog in late August with a vague statement saying that Windows system components were to begin respecting the default web browser setting. Windo… [+4746 chars]"
                //         },
                //         {
                //             "source": {
                //                 "id": null,
                //                 "name": "BleepingComputer"
                //             },
                //             "author": "Sergiu Gatlan",
                //             "title": "Microsoft leaks 38TB of private data via unsecured Azure storage",
                //             "description": "The Microsoft AI research division accidentally leaked dozens of terabytes of sensitive data starting in July 2020 while contributing open-source AI learning models to a public GitHub repository.",
                //             "url": "https://www.bleepingcomputer.com/news/microsoft/microsoft-leaks-38tb-of-private-data-via-unsecured-azure-storage/",
                //             "urlToImage": "https://www.bleepstatic.com/content/hl-images/2023/06/12/microsoft-azure.jpg",
                //             "publishedAt": "2023-09-19T14:15:08Z",
                //             "content": "The Microsoft AI research division accidentally leaked dozens of terabytes of sensitive data starting in July 2020 while contributing open-source AI learning models to a public GitHub repository.\r\nAl… [+3322 chars]"
                //         },
                //         {
                //             "source": {
                //                 "id": null,
                //                 "name": "AppleInsider"
                //             },
                //             "author": "news@appleinsider.com (Christine McKee)",
                //             "title": "Microsoft Office Home & Business 2021 for Mac dips to $32.97, a discount of 87% off",
                //             "description": "Say good-bye to pesky subscriptions with this 87% cash discount on a standalone Microsoft Office Home & Business 2021 license for Mac.Looking for an affordable way to outfit your Mac with Microsoft Office, without the hassle of managing a subscription? Micros…",
                //             "url": "https://appleinsider.com/articles/23/10/06/microsoft-office-home-business-2021-for-mac-dips-to-3297-a-discount-of-87-off",
                //             "urlToImage": "https://photos5.appleinsider.com/gallery/56679-115231-microsoft-office-sale-xl.jpg",
                //             "publishedAt": "2023-10-06T10:02:19Z",
                //             "content": "Say good-bye to pesky subscriptions with this 87% cash discount on a standalone Microsoft Office Home &amp; Business 2021 license for Mac.\r\nLooking for an affordable way to outfit your Mac with Micro… [+1459 chars]"
                //         },
                //         {
                //             "source": {
                //                 "id": "business-insider",
                //                 "name": "Business Insider"
                //             },
                //             "author": "Filip De Mott",
                //             "title": "CHART OF THE DAY: The S&P 500's top 7 stocks have soared more than 50% in 2023, while everything else is 'basically flat'",
                //             "description": "\"If you buy the S&P 500 today, you are basically buying a handful of companies that make up 34% of the index,\" Torsten Sløk wrote.",
                //             "url": "https://markets.businessinsider.com/news/stocks/sp500-spx-magnificent-7-tech-stocks-artificial-intelligence-nvda-tsla-2023-9",
                //             "urlToImage": "https://i.insider.com/6511ac22e2c0220019ef4abd?width=1200&format=jpeg",
                //             "publishedAt": "2023-09-25T17:08:07Z",
                //             "content": "Bloomberg, Apollo Chief Economist\r\n<ul>\n<li>The S&P 500's top seven stocks have gained more than 50% this year, Apollo's Torsten Sløk wrote.</li>\n<li>But the rest of the benchmark index's stocks have… [+2054 chars]"
                //         },
                //         {
                //             "source": {
                //                 "id": "business-insider",
                //                 "name": "Business Insider"
                //             },
                //             "author": "Aruni Soni",
                //             "title": "OpenAI eyes share sale that could triple its valuation to $90 billion, behind only ByteDance and SpaceX among top startups",
                //             "description": "Instead of issuing new shares, a potential deal would allow OpenAI employees to sell their existing shares, the Wall Street Journal said.",
                //             "url": "https://markets.businessinsider.com/news/stocks/openai-share-sale-chatgpt-90-billion-valuation-artificial-intelligence-investing-2023-9",
                //             "urlToImage": null,
                //             "publishedAt": "2023-09-27T16:59:34Z",
                //             "content": "OpenAI CEO Sam Altman.Kevin Dietsch/Getty Images\r\n<ul>\n<li>OpenAI is in talks for a share sale that could value it at $80 billion-$90 billion, the Wall Street Journal reported.</li>\n<li>Instead of is… [+2343 chars]"
                //         }
                //     ]
                //     this.setState({ article: articles })
                //     this.setState({ loading: false })
                // }, 10000)
            } catch (error) {
                console.error('Error:', error);
            }
        }
    }
    async componentDidUpdate(prevProps) {
        if (this.props.category !== prevProps.category){
            this.setState({ loading: true })
            let response = await fetch(`https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=${this.props.apiKey}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            let data = await response.json();
            this.setState({ article: data.articles })
            this.setState({ loading: false })
        }   
    }
    render() {
        const { searchTerm, category} = this.props;
        return (
            <>
                {this.state.loading ? <Loader isVisible={true} /> :
                    <div className='mb-2'>
                        <h2 className='mb-3 result'>Results of <strong>{category ? category : searchTerm}</strong></h2>
                        {this.state.article.map((e) => {
                            return <NewsItem key={e.url}
                                title={e.title}
                                description={e.description}
                                imgurl={(e.urlToImage) ? e.urlToImage : thumbnail}
                                publishedAt={e.publishedAt}
                                author={e.author ? e.author : "Unknow"}
                                content={e.content}
                                newsUrl={e.url}
                            />
                        })}
                    </div>
                }
                {/* <nav aria-label="Page navigation example">
                    <ul className="pagination justify-content-center">
                        <li className="page-item ">
                            <a className="page-link shadow-none" href="/">Previous</a>
                        </li>
                        {range.map((index) => {
                            return <li key={index} className="page-item ">
                                <a className="page-link shadow-none" href="/">{index + 1}</a>
                            </li>
                        })}
                        <li  className="page-item ">
                            <a className="page-link shadow-none" href="/">Next</a>
                        </li>
                    </ul>
                </nav> */}
            </>
        )
    }
}

export default News
