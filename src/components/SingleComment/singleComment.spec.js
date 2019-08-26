jest.unmock('axios');
import React from 'react';
import '@babel/polyfill';
import moxios from 'moxios';
import { mount, configure } from 'enzyme';
import { Provider } from 'react-redux';
import singleCommentReducer from './singleComment.reducer';
import Adapter from 'enzyme-adapter-react-16';
import configureStore from 'redux-mock-store';
import { BrowserRouter } from 'react-router-dom';
import thunk from 'redux-thunk';
import {
  getCommentOnArticleStart,
  getCommentOnArticleSuccess,
  getCommentOnArticles,
  likeComment
} from './singleComment.action';
import SingleComment from './index.jsx';
import {
  GET_COMMENT_ON_ARTICLE_START,
  GET_COMMENT_ON_ARTICLE_SUCCESS,
  LIKE_COMMENT_ON_ARTICLE_SUCCESS
} from '../../actionTypes/index';

configure({ adapter: new Adapter() });

const middlewares = [thunk]; // add your middlewares like `redux-thunk`
const mockStore = configureStore(middlewares);

let store = mockStore({});

const likeRespone = {
  status: 'success',
  data: {
    likeCount: {
      count: 1,
      rows: [
        {
          id: 92,
          userId: 7,
          email: 'dharmykoya38@gmail.com',
          commentId: 17,
          createdAt: '2019-08-28T07:59:21.405Z',
          updatedAt: '2019-08-28T07:59:21.405Z'
        }
      ]
    },
    message: 'you have successfully liked this comment',
    commentId: '17',
    userId: 7
  }
};

const allCommentResponse = {
  status: 'success',
  data: {
    article: {
      id: 97,
      title: 'All you should Know about the World of technology',
      description: 'the world at large',
      body:
        "No-risk matched betting\nfree bets from matched betting\n\nHands down the quickest way to make a lot of money (well, without breaking the law). Lots of students have genuinely made £100s from this technique. It's completely legal, risk free, tax free, and anyone over 18 in the UK can do it (Not in UK? Skip to no. 2).\n\nIt works by taking advantage of free bets regularly offered by betting sites through 'matching' them at a betting exchange. Matched betting eliminates the risk (you are betting both for and against a certain outcome).\n\nThis leaves you being able to squeeze out the free bet, which can be as much as £100. Multiply this by how many betting sites there are and you can quite easily come away with a profit of a few hundred pounds.\n\nOwen walks you through how to make your first £13 profit (using a real life example) in this gem of a guide to matched betting. If you know of any better way to make £50/hr sitting at home, please let us know!\n\nOnline surveys\npaid surveys\n\nAn increasingly popular way for students to make money is to fill out online surveys in their spare time. Research companies are always recruiting new members worldwide to answer surveys and test new products.\n\nFor a few minutes of form filling, you can make a couple of quid which is paid as cash or rewards. You can bag up to £3 ($5) for some surveys!\n\nA few good ones to try are: Toluna, LifePoints, InboxPounds, Onepoll, i-Say, Opinion Outpost, Panel Opinion, The Opinion Panel, YouGov, Pinecone, SurveyBods, Hiving, Panel Base, Prolific, Valued Opinions, Survey Junkie, New Vista.\n\nAlso sign up for Swagbucks which rewards you for surveys as well as simply surfing the web, watching videos and playing games.\n\nUpdate: See our new full guide to the best paid online surveys!\n\nPaid for searching the web\nInterested in earning cash for doing what you already do online? This has to be one of the easiest methods of making money online without really any effort or change in your behaviour.\n\nThis innovative idea by Qmee.com rewards you for searching in Google, Bing or Yahoo. You just install a simple add-on to your browser and when you conduct a search there may be a few sponsored results alongside your normal search.\n\nqmee paid search\n\nEach Qmee result has a cash reward attached - if you are interested in it simply click on it and collect your reward.\n\nThe best thing is there is no minimum to cashout - our first one was just 72p wired to our Paypal account. You also have the option to donate it to charity.\n\nSign up now for free and start earning from your own searches! Click here to start.\n\nOnline market trading\nWhilst this isn't necessarily an easy way to make money, investing in stock markets can be lucrative if you learn to do it properly and safely. By the same token, you may suffer significant losses if you don't take it seriously.\n\nToday there is no need to fund the yachts of Wolf of Wall Street style stock brokers. You can do it all yourself with the help of online market trading platforms.\n\nHaving spent many hours researching this new opportunity, I've been experimenting with the two biggest platforms: Plus500 and eToro.com. Both offer free practice accounts.\n\nOverall I prefer eToro with over 8 million users worldwide. It has been featured in a BBC 2 documentary \"Traders: Millions by the Minute\" and recently began sponsoring several Premier League football clubs.\n\netoro trading\n\nOne of the best things on eToro is the CopyTrader feature. This lets you literally see, follow and copy the investments of other top performing traders.\n\nFollow George's complete guide to trading on eToro to learn more. I think $200 is a good amount to get the most out of the learning curve by trying out a few different markets. If nothing else you'll learn a great deal about various investments and industries.\n\nPlease be aware that all trading involves risk. 75% of retail investor accounts lose money when trading CFDs with this provider. You should consider whether you can afford to take the high risk of losing your money. This content is for educational purposes only and is not investment advice.\n\nStart your own website\nowen burek\n\nInterested in generating passive income? You need a website. It's THE way to make money while you sleep.\n\nStarting a website with Bluehost takes less than 20 minutes, costs hardly anything and can be done by an 82 year-old. It only takes a bit of plugging on social media to get your first visitors, and there are plenty of ways to monetise your site.\n\nSave the Student is just one example of a successful website, started at university by Owen Burek in his first year, which has since grown into a full-time and sizable enterprise.\n\nRead Owen's step-by-step guide on how to start a website in 20 minutes. It's really one of the best assets you can have.\n\nReview websites & apps for cash\nusertesting.com\n\nWell it seems like you're pretty nifty with a web browser, so perhaps it's time to turn pro and browse websites as a paid and fun job!\n\nIntroducing UserTesting.com - a new platform that pays everyday people to review all kinds of websites. Each review takes around 20 minutes and bags you $10 (£6.50) via Paypal.\n\nSimply sign up here, complete a test review and look forward to receiving websites in your inbox.\n\nThe 'Disney Vault' secret\ndisney vault\nCredit: Walt Disney Pictures Inc.\n\nTo keep demand high across generations, Disney Studios carefully restrict the supply of some home release classics. They are locked away in the 'vault' for 8-10 years before being released for a short unspecified time.\n\nBuy them in this window at normal retail price and you can turn a nice profit when they go off sale for another decade or so.\n\nFor example, in 2011 you could buy Beauty and the Beast on Blu-ray 3D for just £24.99. In just a couple of years it was on Amazon for a staggering £74.99!\n\nDisney vault\n\nImportantly, not all Disney releases are subject to the vault and only the true classics will maintain such demand.\n\nRight now there are just 2 titles out of the vault which I would recommend snapping up. They are Bambi Diamond Edition Blu-ray and The Lion King Diamond Edition Blu-ray.\n\n'Get Paid To' sites\ncoins\n\nSimilar to making money from online surveys, GPT sites reward you in cash and vouchers for completing various offers or activities online.\n\nThe most popular sites today are Toluna, Swagbucks and InboxPounds.\n\nNew! Join our 'make money' mailing list for the best opportunities every month.\nFirst name\nEmail address\n\nPrivacy policy\n\nBecome a delivery rider or driver\nMake money as a delivery driver\n\nGot a bicycle, motorbike or car? What about a Smartphone? That's all you need to make some extra money by delivering food or people whenever you've got some spare time.\n\nSign up to delivery specialist companies like Deliveroo who are always on the hunt for new riders. They allow you total flexibility to work when you want, delivering food from restaurants to the customers' door. You can make up to £16 an hour.\n\nDouble-up your opportunities by directly contacting local takeaways and bigger chains like Dominos to see if they have any delivery jobs going.\n\nWrite and publish a Kindle eBook\nIf students are good at anything, it's researching and writing. With the Amazon Kindle store, anyone can publish an eBook and make money.\n\nAnd the Kindle app is now available on almost any device (laptops, iPads, smartphones and yes, Kindles) so your global market is huge!\n\nList your book for £1.49 - £6.99 and you earn 70% of the sale. Considering Amazon is the ultimate selling machine (and remember people are looking to spend), that is a fantastic deal.\n\nkindle ebooks\n\nThe key to success with eBooks is to create value, and write non-fiction. Simply bundling information you have researched and compiled on a common problem (eg. 'secrets' to finding a job) and then presenting it in an easy to digest format (an eBook) justifies someone spending a few quid on it.\n\nAnother big tip is to have a great cover designed (browse these) so it stands out, and once your book is live on the Kindle store it's really important to get some reviews so it shows up higher in results. Encourage readers to leave an honest review at the end of your book.\n\nThe best thing about this lucrative idea is that once you've invested the time (say 20 hours), you'll earn a passive income for years to come! For a step-by-step guide to publishing and earning with eBooks, see \"How to write a nonfiction eBook in 21 days\".\n\nAffiliate marketing\nIf you've got a good presence on social media or perhaps you even have a blog or website, you can start bringing in money immediately by promoting all sorts of companies, products, services and offers online.\n\nAffiliate Window logo\n\nSign up as a publisher on the Awin network, check their offers blog or browse the merchant listings to find something you think your friends would be interested in, grab your affiliate link and share it. If someone buys (can be within up to 90 days) using your link you'll make a nice commission.\n\nTo take it a step further, set up a website (read our guide) or a topical Facebook page and invite all your friends to join it and post your affiliate offers on there.\n\nMobile phone recycling\nmobile recycle\n\nYou can earn good money and help the environment by recycling your old mobile phones and other unused devices. Maybe ask your parents if they have any lying around too.\n\nHead to our page on making money from old phones for the best companies to use and how to ensure you get all the cash quoted to you online.\n\nBecome a 'Clickworker'\nThe Clickworker.com concept is based on 'internet crowd-sourcing' where businesses advertise specific, scalable tasks they need completing quickly. And for us, it's an easy way to make fast cash from our couch.\n\nclickworker\n\nThere are a variety of tasks, but most commonly they involve mindless data entry, web research or form filling. You are rewarded and paid in cash (via Paypal) for the work you do, and you can choose for what and when you work. Give it a go. [If you're US based, also try Amazon's 'Mechanical Turk'].\n\nClaim tax back\nMany students work part-time or during the summer months, and others will be on placements or paid internships. More often than not, if you are a student working during the year, you will be overpaying income tax.\n\nWhy? Simply because few students reach the personal tax-free income allowance each year but are put on an emergency basic tax-code by their employers meaning tax is being paid when it shouldn't be.\n\nClick to use the Tax refund calculator\n\nTo learn more and calculate how much tax back you might be due, see our guide on student tax refunds.\n\nGet cashback when shopping\nOur Quidco Cashback\nI earned this much in 2 years\n\nThis is not only a way to make money but also to save money as a student. If you look at it in a different way then you are making money with every purchase you would have made anyway, whether it be 10% or 0.5% cashback.\n\nThere are a number of cashback sites out there which pay you the commission they otherwise would have earned.\n\nWe recommend signing up with Top Cashback, Quidco.com and Swagbucks which are free and offer the best selection of retailers and exclusives.\n\nPart-time job\nbar jobs\n\nA part-time job is the obvious first choice, opted for by most students looking to supplement their student loan. It provides a pretty steady flow of income and can enable you to gain valuable work experience.\n\nBut good jobs are not always easy to find!\n\nStart with our student job search, then check local classifieds and your university careers service for vacancies.\n\nIt's also worth signing up with CV Library, a free service which will match your CV with suitable part-time jobs and career opportunities.\n\nRead our guide to finding a part-time job whilst studying for more tips.\n\nGigs on Fiverr\nFiverr pranks\n\nFiverr is now the world's largest marketplace for people to make money selling small services (known as 'gigs').\n\nWhat you offer could be absolutely anything, from writing and translating, social media posting, playing pranks and teaching to creating music, voiceovers and short video clips for people all around the world!\n\nThe default price is $5 (hence Fiverr..), but you can attach extra services to gigs for more money. Whilst it might not seem like much, it can quickly add up and there are plenty of examples of people making a really good living from the site. The key is to get a system in place which minimises the time spent on each gig.\n\nBut there is another way to profit even more from Fiverr for potentially far less work. How? By simply reselling gigs elsewhere. For example, find a decent logo designer then reply to jobs on Upwork or even local classifieds. A $5 spend can easily become $50+, and it's repeatable!\n\nIf you're not interested in selling at all there's SO much good stuff you can get done for yourself. Have a browse and get inspired!\n\nReview music for money\nIf you love music, make it your business by reviewing unsigned bands and artists online for cash with Slicethepie.\n\nIt can take a while to build up your reputation but some users of the site have said that they earn £40 a month. This may not sound like much, but if it's something you enjoy then it shouldn't be hard work and is another thing for your CV. Money you earn will be in $US but anyone can sign up and review.\n\nslicethepie\n\nTo get started, head over to Slicethepie now or read our quick guide for more info.\n\nSell your notes\nIf you don’t mind sharing your notes with other students it’s a great way to generate a little extra cash. There are sites out there that you can upload your notes to, along with your price, and then when another student downloads them you get paid.\n\nMost of these sites like Nexus Notes and Stuvia are free for you to list your notes but tend to take a cut of your profit in order to handle the marketing etc so that you don’t have to go out there and promote your notes yourself.\n\nYou will most likely have to upload PDFs but it’s worth it for the return and you can submit handwritten notes but you’re likely to make more money if they’re typed up.\n\nSell second-hand course books\nOne great way to make money is to buy other students' textbooks at the end of the year, and then sell them just after freshers' week – when the new intake of students know that they need them!\n\nYou can either advertise on campus or list them online very easily on Amazon Marketplace (just bear in mind they take a commission on books sold).\n\nHere's 28 other things you can sell right now!\n\nCompetitions\nEntering competitions of course comes with no guarantees, but there is a growing community of so-called 'compers' in the UK consistently making up to £50,000 a year through all sorts of competitions.\n\nTypes of competitions available to enter vary from simple registration forms and Facebook page liking to answering questions correctly over the phone to being a TV game show contestant. Imagine you made it onto Deal or No Deal instead of just watching it!\n\nStart by entering our very own monthly student competition (Like our Facebook page to see when our next one is)!\n\ncompetitions\n\nThen head to our active competitions page to enter other free competitions that we have found. Just note that some of these sites may send you spam so use an alias email address and opt-out of as many of the offers as possible.\n\nFor loads more tips on achieving success and making money from competitions, read our guide to entering competitions.\n\nBuy and sell domain names\ndomain-for-sale\n\nA domain name is just a website address (eg. 'savethestudent.org' or 'mysite.co.uk') and there are lots of extensions (.com, .net, .co.uk etc).\n\nThey cost as little as $0.99 to register with GoDaddy.com yet premium domain names can fetch $1,000s if not millions when sold on. In 2007 VacationRentals.com went for a cool $35m!\n\nNow you're probably not going to come across anything like that, but you can still turn a quick profit with a bit of searching. The trick is to find available domain names which have some commercial value, snap them up and then list them for sale on a site like Sedo.com.\n\nMystery shopping\nbe a mystery shopperToday becoming a mystery shopper is easier than you think and you can get rewarded handsomely.\n\nThere are dozens of agencies that pay you to visit all sorts of shops and restaurants to feedback on how they are performing. We've reviewed the best agencies in our guide how to become a mystery shopper.\n\nTasking apps are another form of mystery shopping, where you earn rewards for completing small local tasks. It can be a lot of fun too!\n\nBe an Extra\nDo you fancy yourself as a budding young actor or just that person that walks past in the background shot of an episode of Eastenders? It could be you if you apply to be an extra in TV or film.\n\nThe pay isn't bad either: £60-80 a day on average, and you hardly have to do anything!\n\nThere are lots of casting agencies that place willing extras. They make their money by taking a cut from your earnings, so always ask what that is before you take on work.\n\nHead over to our how to become an extra guide for 5 of the better agencies, plus lots more advice on getting your first gig.\n\nSell all your old CDs, games and movies\nIf you are looking to make a very quick buck, then selling your old bits and bobs that are cluttering up your room is a good idea.\n\nThe best thing about it is that you can rip all the songs and films onto your laptop or external hard drive before selling them. This means that you are only really selling the plastic and artwork!\n\nYou can earn anything from 10p to £20 per item, and the earnings can really add up if you have a large collection. Whilst you're at it, see if your parents have any 'clutter' they'd be happy to see the back of.\n\nYou can also sell almost anything for free on Amazon Marketplace or Preloved and sites like MusicMagpie will pay you instantly for sending in unwanted items.\n\nFor more tips and places to sell check out our guide on selling DVDs, CDs and games.\n\nSell on your education!\ngraduate_studentBecoming a tutor to other students is easier than ever. Until recently your market was limited to local face-to-face sessions, but thanks to online tutoring sites you can go global!\n\nUdemy allows anyone to create an online course (on literally anything!) and get paid forever after as users take it up.\n\nFor one-to-one tutoring, list yourself on Superprof and UK Tutors.\n\nYou can expect to earn upwards of £10 an hour, and you don't have to be highly qualified to tutor younger GCSE or even A Level students. Get started with our guide to making money as a private tutor.\n\nSell your photos\nIf you think you've got a good shot and a little creativity, try uploading your photographs for free to stock websites. A good starting point is Adobe Stock or Getty Images.\n\nMake more money selling photo subjects that have fewer search results but you feel would have some demand. It might be a good idea to test them out in print first yourself (get free photo prints here).\n\nRent out your car parking space\ncar parking spaceSome student accommodation comes with a drive or garage. If you aren't using your parking space and you live in a busy area then you might be in luck. There are plenty of people that may work in the city centre and are fed up of paying through the roof for daily parking.\n\nAdvertise your space on Gumtree, Parklet or Just Park.\n\nOr, check out our full guide to renting out your parking space.\n\nBabysitting\nIt's a classic money-maker, and for good reason. You get paid (well) to watch TV and not very much else - hopefully!\n\nIf you are wondering what to charge have a look at local ads, but you can expect to be paid over £9ph even if you aren't trained in childcare.\n\nAside from advertising yourself, it's free to create a profile on Care Babysitting. It really can be easy money (unless you get stuck with the child from hell!).\n\nOur guide to babysitting walks you through the main considerations. For instance, in the UK you will need a DBS (Disclosure and Barring Service) check to look after small children, even though some parents may not ask for one.\n\nDog walking & sitting\nIf babies ain't your thing, then maybe canines are... dog sitting is big business. Students especially are likely to have free time during the day when others are out at work and worried about their pets at home.\n\nYou could bag around £8 an hour per dog, and it's also a great way to keep fit.\n\nJoin Care Pet Care who are best for dog sitting and also Tailster who specialise in dog walkers.\n\nBecome your own bank\nbe your own bank\n\n'Peer-to-peer' lending is the future of banking. It cuts out the middle-man, passing on higher interest rates to you and cheaper loans to borrowers. And it's all managed online from the comfort of your sofa.\n\nFounded in 2009, RateSetter was the first to reimburse lenders on late payments or defaults through its 'Provision Fund'. Effectively it is designed to be like a normal savings account. To date RateSetter say no investors have ever lost money, and they are fully FCA regulated.\n\nRight now you can expect to achieve up to 5% fixed return, depending on how long you choose to lend for. If you can, go for the ISA account to earn interest tax-free.\n\nThere's no fee to withdraw your money from RateSetter, unless you lock into a 1 or 5 year higher fixed interest rate where the early withdrawal fee is 0.3% and 1.5% respectively.\n\nUpdate: for a limited time also get this £100 bonus when you invest £1,000 for a year.\n\nWork as a charity collector\nOk, so this job takes a certain kind of person, as you'll have to take a lot of rejection and be persistent.\n\nBut if you are bubbly, personable and reckon you could sell ice to an Eskimo then this could actually be a great student money making idea. You get paid commission on new sign ups (typically around £20).\n\nHave a look at Wesser as well as charity websites like Oxfam.\n\nRent out your house for filming\nDirectors for TV and film are always on the hunt for houses to film in. For instance, a scene for Coronation Street was recently filmed in the student house one of the Save the Student editors used to live in!\n\nNot only can you make good money but it's crazy seeing your own place on TV. Start out by looking at this site.\n\nRent out your body\nstudent thinkingIf you are comfortable taking off your kit then why not try life modelling. Sit there in the buff while budding artists capture your every curve (or pokey bits) in frightening detail! Try RAM, a website especially designed for these kind of jobs.\n\nYou could also get involved in clinical drug trials, but be sure you fully appreciate any risks attached.\n\nWarning: Do not do anything you are not comfortable with, no matter how desperate you are for money!\n\nFreelance work\nPerhaps you enjoy writing, managing Facebook pages or doing a little bit of graphic design in your spare time. There are so many freelance jobs out there that require simple skills or just time that someone else might not have.\n\nAnd the best thing about freelancing is that you can work for clients in the UK and around the world with just an internet connection from home, to your own hours whilst developing valuable skills.\n\nA great place to start is with the leading freelance site Upwork.com. Or try using our student job search to find freelance jobs closer to home.\n\nSell clothes on eBay\nebay-logoEveryone's best friend when it comes to getting rid of junk is eBay. Online auctions are a sure-fire way to turn that sleeveless jacket (which came in and out of fashion in a week) into hard cash.\n\nSome eBay sellers look at trends and try to predict what will be big ahead of the market. If you are good and don't mind taking a risk then you can buy early in bulk and sell on when the craze hits.\n\nFor lots more tips on selling on eBay read this guide.\n\nSell your stories and videos\nIf you have an interesting story then you could try selling it to the papers. It could be anything from sleeping with a professional footballer to getting caught in a clothes horse!\n\nOne of the Save the Student team was unfortunate enough to have a pigeon fly through and smash their window at university and sold the story to The Sun for a tidy £50.\n\nYou could also film your mates at all times and send it into You've Been Framed to net yourself £250 and a few seconds of fame.\n\nYouTube videos\nAccording to recent stats we now watch more videos on YouTube than searches on Google. And with the recently introduced YouTube Partner Program you can now profit from making and uploading videos. You will receive a percentage of the advertising revenue collected per 1,000 views.\n\nDepending on how successful you are (virality, subscriber base and topic) you can make a lot of money, and there are plenty of stories every week of more and more YouTubers making it their career.\n\nFor more tips read our guide to making money from YouTube.\n\nNetwork marketing\nthe business of the 21st centuryAlso known as Multi-Level Marketing (MLM), this is a business model that allows you to generate ongoing income in two ways: by making a commission selling products and by recruiting other members who go on to sell. The latter allows you to make money from the sales made by those you have recruited.\n\nImportantly, this is not a pyramid scheme (they are illegal) because there is an end goal which involves a customer buying a product or service of value.\n\nIt's also not a 'get rich quick' scheme. You will have to work I'm afraid! However with the growth of social media, network marketing is becoming easier and lots of people are now making a decent living from it.\n\nThis is a serious way of making good money on your own terms and it's well worth reading up on it. I recommend getting \"The Business of the 21st Century\" by Robert Kiyosaki.\n\nSource property for wealthy investors\ncontents insuranceWe all know how much money there is in property, but on the surface (with house prices as high as they are) you might be thinking this market is off-limits.\n\nTruth is, lots of people make a great deal of cash simply sourcing suitable properties for wealthy investors who simply have no time.\n\nThe trick is to find properties below market value (BMV) by avoiding estate agents and instead flyering your area with your contact details offering to buy houses. Then approach investors with a no-brainer offer to pass on the details of cut-price property in exchange for a % of the sale value.\n\nMost cities will have monthly networking events for landlords and property investors. Track these down, sign up, put on your best suit and go along with lots of business cards. Or you could start on LinkedIn or even Twitter to build some initial contacts.\n\nAs you might imagine, this isn't necessarily a quick way to make money but once you've got a few investors in your phone book it can prove to be very lucrative in the long run. If you're interested, I recommend reading this book.\n\nBitcoin and cryptocurrencies\nUpdate. We're increasingly being asked about how to make money from Bitcoin (and other cryptocurrencies). This isn't surprising given the ever-growing hype and stories of kids making millions.\n\nPlease don't rush into buying Bitcoin to make money. It's really important to know what you're getting involved with. Read our new how to buy Bitcoin tutorial which explains everything you need to know.\n\nThere are many other creative ways to make money as a student, such as our 50 business ideas.\n\nHOTTEST DEALS\n\nSwagbucks – Get free gift vouchers & cash\n\nWin £250 of Greggs!\nVirgin Broadband exclusive voucher\nVirgin Media Fibre Broadband + Free £50 Nando’s voucher\nEarn-Amazon-Vouchers\nEarn £20 Amazon Vouchers\nWHAT'S TRENDING\nWays to save money saving hacks\n83 practical ways to save money\nbusiness ideas\n53 business ideas to start at university\nNational Student Money Survey 2019\nStudent Money Survey 2019 – Results\n\nHow to start a website in 20 minutes\nonline surveys\nThe best paid online survey websites\nmake money\n40 easy ways to make money quickly\nFree money cheat sheet!\nEnter your email\n Go\nWeekly deals, guides + free cheat sheet. Privacy policy\n\nwhat are other people reading?\nebay selling help\n11 vital selling tips for eBay success\n\nMake money from Matched Betting (full guide)\nstudent tax refund guide\nStudent tax refunds – are you owed money?\n\nHow to start a website in 20 minutes\nFree money cheat sheet!\nEnter your email\n Continue \nWeekly deals, guides + free cheat sheet. Privacy policy\n\nComments\nAndy\n\nGreat ideas here! I personally am a fan of blogging and YouTube as great ways to make money online! There are so many different niches available for you to build your online business. You just have to get started!\n\nMark Jones\n\nReally good article with some great tips. Affiliate marketing has the potential to earn lots of money and I'm hoping I can make it happen. I have tried the matched betting and it DEFINITELY works. The one thing I would say is that you need to check that any bets have been accepted by the bookmaker. I have had on occasion bets which look like they have been accepted but don't register in my account. Always go into your account and check outstanding bets or your bet history.\n\nLinda Springer\n\nA suggestion - if you are a reasonably healthy individual, try donating plasma - it's in high demand all year round and they will compensate well particularly if you become a regular donor\n\nTerence\n\nI'm going for the Clinical tests.... regardless of the risks, I'd rather get rich or die trying.\n\nNoel\n\nThanks you for the tips! I've already signed up to Tailster and got myself a few bookings, can't thank you enough for bringing them to my attention! Tailster has helped me fund me whilst at uni, i would highly recommend anyone to use their service if you have a passion for pets with the added bonus of getting paid for something you love!\n\nDenise\n\nGuys thank you for these tips, I'm looking to make a little extra to fund my dream to go sailing. Though these are not big amounts they will be perfect to add a bit of money to the kitty. Every little bit counts!\n\nI'll be trying out quite a few of these in my spare time and will come back and leave some feedback on the ones I have tried.\n\nKieran Nash\n\nHow long after buying the Disney films should you put them back on sale?\n\nIan\n\nWhat happens is they go back to the vault, and the movies suddenly become rare again. Basically put the movie on the market whenever the prices go up. It's kinda like stocks, but much easier to predict. Just check Amazon occasionally and when the price soars, sell it.\n\nMeri Caska\n\nOne of the best posts I have read. I loved it. thanks for sharing with us.\n\nAsk us a question or share your thoughts!\n\nTweet @savethestudent - Facebook Message - Email\n\n Share  Tweet\nNext Article\n\nThe best paid online survey websites\nthe student money website\n \n \n \n \nSave the Student provides free, impartial advice to students on how to make their money go further. School doesn't teach you the real life stuff we share here. Find out more:\n\nThe Story  or Meet the Team\nJob vacancies\n\nAdvertise\n\nPress & media\n\nContact us\n\nRECENT POSTS\nHow to choose the best laptop for university\n22 August 2019\n\nThe best loyalty cards 2019\n22 August 2019\n\nHighest paid graduate jobs in the UK 2019\n22 August 2019\n\nBest TV game shows to win cash prizes\n21 August 2019\n\nSTUDENT PICKS\nStudent money cheat sheet\n\nStudent money Podcast\n\nStudent loan calculator\n\nStudent discounts\n\nStudent job search\n\nParents' guide to university\n\nUseful resources\n\nDisclaimer: All content on this website is based on individual experience and journalistic research. It does not constitute financial advice. Save the Student and its authors are not liable for how tips are used, nor for content and services on external websites. Common sense should never be neglected!\n\nWe sometimes use affiliated links which may result in a payment following a visitor taking action (such as a purchase or registration) on an external website. This helps keep Save the Student free. The user experience shouldn’t be any different, and our editorial decision making is not affected by such links.\n\nPrivacy Policy - Sitemap - © 2019 Save the Student. All Rights Reserved. \nLike most sites, we use cookies to optimise your e",
      image:
        '{"0":"https://res.cloudinary.com/fxola/image/upload/v1566483734/post/20190731_095438.jpg.jpg"}',
      readTime: '20 min read',
      viewsCount: 39,
      slug: 'all-you-should-know-about-the-world-of-technology',
      isPublished: true,
      publishedAt: '2019-08-22T19:55:45.025Z',
      isDeleted: false,
      createdAt: '2019-08-22T14:22:14.540Z',
      deletedAt: null
    },
    comments: [
      {
        id: 17,
        body: {
          'Tue Aug 27 2019 13:03:03 GMT+0000': 'I love the article'
        },
        highlightedText: null,
        slug: 'all-you-should-know-about-the-world-of-technology',
        createdAt: '2019-08-27T13:03:03.338Z',
        userComment: {
          image:
            'https://res.cloudinary.com/fxola/image/upload/v1562006344/avatar.png',
          firstName: 'dha',
          lastName: 'dha',
          userName: 'dharmy',
          email: 'dharmykoya38@gmail.com'
        },
        commentLikes: [
          {
            id: 92,
            userId: 7,
            email: 'dharmykoya38@gmail.com',
            commentId: 17,
            createdAt: '2019-08-28T07:59:21.405Z',
            updatedAt: '2019-08-28T07:59:21.405Z'
          }
        ]
      }
    ]
  }
};

describe('Signle Comment Test', () => {
  describe('Single Comment Actions', () => {
    beforeEach(() => moxios.install());
    afterEach(() => moxios.uninstall());
    it('dispatches getCommentOnArticleStart action', done => {
      const expectedActions = [{ type: 'GET_COMMENT_ON_ARTICLE_START' }];

      store.dispatch(getCommentOnArticleStart());

      expect(store.getActions()).toEqual(expectedActions);
      done();
    });

    it('dispatches getCommentOnArticleSuccess action', done => {
      const expectedActions = [
        { type: 'GET_COMMENT_ON_ARTICLE_START' },
        {
          type: 'GET_COMMENT_ON_ARTICLE_SUCCESS',
          allComment: likeRespone.data
        }
      ];

      store.dispatch(getCommentOnArticleSuccess(likeRespone.data));
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });

    it('dispatches getCommentOnArticles action', done => {
      const slug = 'some-slug';

      moxios.stubRequest(
        `https://persephone-backend-staging.herokuapp.com/api/v1/articles/${slug}/comments`,
        {
          status: 200,
          response: allCommentResponse
        }
      );

      const expectedActions = [
        { type: 'GET_COMMENT_ON_ARTICLE_START' },
        {
          type: 'GET_COMMENT_ON_ARTICLE_SUCCESS',
          allComment: likeRespone.data
        },
        { type: 'GET_COMMENT_ON_ARTICLE_START' }
      ];

      store.dispatch(getCommentOnArticles(slug));
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });

    it('dispatches likeComment action', done => {
      const slug = 'some-slug';
      const commentId = 92;
      const token = 'some-token';

      moxios.stubRequest(
        `https://persephone-backend-staging.herokuapp.com/api/v1/articles/${slug}/comments/${commentId}/reactions`,
        {
          status: 200,
          response: likeRespone.data
        }
      );

      const expectedActions = [
        { type: 'GET_COMMENT_ON_ARTICLE_START' },
        {
          type: 'GET_COMMENT_ON_ARTICLE_SUCCESS',
          allComment: likeRespone.data
        },
        { type: 'GET_COMMENT_ON_ARTICLE_START' },
        {
          type: 'GET_COMMENT_ON_ARTICLE_SUCCESS',
          allComment: allCommentResponse.data
        },
        { type: 'GET_COMMENT_ON_ARTICLE_START' }
      ];

      store.dispatch(likeComment(slug, commentId, token));
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });
  });

  describe('Single comment Reducers', () => {
    const initialState = {
      allComment: null,
      loading: false,
      commentLiked: null
    };

    it('Should return default state', () => {
      const newState = singleCommentReducer(undefined, {});
      expect(newState).toEqual(initialState);
    });

    it('Should return a new state if it recieves GET_SINGLE_ARTICLE_START in action type', () => {
      const state = {
        allComment: null,
        loading: true,
        commentLiked: null
      };
      const newState = singleCommentReducer(initialState, {
        type: GET_COMMENT_ON_ARTICLE_START
      });
      expect(newState).toEqual(state);
    });

    it('Should return a new state if it recieves GET_SINGLE_ARTICLE_START in action type', () => {
      const state = {
        allComment: allCommentResponse.data,
        loading: false,
        commentLiked: null
      };
      const newState = singleCommentReducer(initialState, {
        type: GET_COMMENT_ON_ARTICLE_SUCCESS,
        allComment: allCommentResponse.data
      });
      expect(newState).toEqual(state);
    });

    it('Should return a new state if it recieves GET_SINGLE_ARTICLE_START in action type', () => {
      const state = {
        allComment: null,
        loading: false,
        commentLiked: likeRespone.data
      };
      const newState = singleCommentReducer(initialState, {
        type: LIKE_COMMENT_ON_ARTICLE_SUCCESS,
        comment: likeRespone.data
      });
      expect(newState).toEqual(state);
    });
  });

  describe('Single comment Component', () => {
    it('should render Single comment component', done => {
      const props = {
        commentLikes: [],
        userComment: allCommentResponse.data.comments[0].userComment,
        body: {},
        handleLike: jest.fn()
      };
      const comment = mount(
        <Provider store={store}>
          <BrowserRouter>
            <SingleComment {...props} />
          </BrowserRouter>
        </Provider>
      );

      const likeIcon = comment.find('.article-comment-like-click a');
      likeIcon.simulate('click');
      expect(likeIcon).toBeTruthy();
      done();
    });
  });
});
