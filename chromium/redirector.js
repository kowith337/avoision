//  avoision - Lightweight browser redirector for those who are addicted to the web of ideas
//  Copyright (C) 2017-2019 David Ryack
//
//  This program is free software: you can redistribute it and/or modify
//  it under the terms of the GNU Affero General Public License as published
//  by the Free Software Foundation, either version 3 of the License, or
//  (at your option) any later version.
//
//  This program is distributed in the hope that it will be useful,
//  but WITHOUT ANY WARRANTY; without even the implied warranty of
//  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//  GNU Affero General Public License for more details.
//  You should have received a copy of the GNU Affero General Public License
//  along with this program.  If not, see <http://www.gnu.org/licenses/>

const TRACKERS_BY_ROOT = {

    // Google's Urchin Tracking Module
    'utm_': [
        'campaign',
        'cid',
        'content',
        'echo',
        'medium',
        'name',
        'pubreferrer',
        'reader',
        'source',
        'swu',
        'term',
        'viz_id'
    ],

    // Strip params in AMP pages, not neccessary overall! (AMP itself is still tracking us, so no extra params to be show!!)
    'amp_': [
        'gsa',
        'js_v'
    ],

    // Probably Google's Urchin copycat!? (https://pantip.com/topic/40043056#comment10)
    'at_': [
        'campaign',
        'content',
        'custom1',
        'custom2',
        'custom3',
        'custom4',
        'custom5',
        'custom6',
        'custom7',
        'custom8',
        'custom9',
        'medium',
        'name',
        'source',
        'term'
    ],

    // Facebook Multi
    'entry': [
        'point',
        '_point',
        '_product'
    ],
    'fb_': [
        'dtsg',
        'dtsg_ac',
        'dtsg_ag',
        'ref'
    ],
    'ft': [
        // '_ent_identifier', // Conflict with reactions in Facebook Basic Phone version
        'entidentifier'
    ],
    'hc_': [
        'location',
        'ref'
    ],
    'loc_': [
        'ref'
    ],
    'messaging_entry': [
        'point',
        '_point',
        '_product'
    ],
    'orig_': [
        'source',
        'src'
    ],
    'page_': [
        'source'
    ],
    'pn_': [
        'location',
        'ref'
    ],
    'privacy_': [
        'mutation_token',
        'source'
    ],
    'redirect_': [
        'source'
    ],
    'ref': [
        '_component',
        '_page',
        '_source',
        '_src', // Twitter use this to track certain clicks.
        '_type',
        'id',
        'src'
    ],
    'sw_': [
        'fnr_id'
    ],
    '__': [
        'ccr',
        'cft__[0]',
        'rv__',
        'so__',
        'tn__',
        'xts__[0]'
    ],
    '__m_': [
        'async_page__',
        'log_async__'
    ],

    //no clue - don't care - don't trust 'em
    'rc_': [
        'fifo',
        'col'
    ],

    // Adobe Omniture SiteCatalyst
    'IC': [
        'ID'
    ],

    // Adobe Omniture SiteCatalyst
    'ic': [
        'id'
    ],

    // Alibaba Multi
    'go_': [
        'itemid',
        'item_id'
    ],
    'main_': [
        'itemid',
        'item_id'
    ],

    // Google
    'gs_': [
        'lcp',
        'l',
        'r'
    ],

    // GitHub Notif Crap
    'notification_': [
        'query',
        'referrer_id'
    ],

    'notifications_': [
        'query',
        'referrer_id'
    ],

    // Hubspot
    '_hs': [
        'enc',
        'mi'
    ],

    // Marketo
    'mkt_': [
        'tok'
    ],

    // MailChimp
    // https://developer.mailchimp.com/documentation/mailchimp/guides/getting-started-with-ecommerce/
    'mc_': [
        'cid',
        'eid'
    ],

    // comScore Digital Analytix?
    // http://www.about-digitalanalytics.com/comscore-digital-analytix-url-campaign-generator
    'ns_': [
        'source',
        'mchannel',
        'campaign',
        'linkname',
        'fee'
    ],

    // Simple Reach
    'sr_': [
        'share'
    ],

    // Vero
    'vero_': [
        'conv',
        'id'
    ],
    // Non-prefixy and 1-offs
    '': [
        // Twitter binding "AMP" param for any outgoing URLs to make sure that you will get AMP page, rather than original site!
        'amp',
        // Bing Crap (MS Edge Chromium)
        'cvid',
        // Facebook Click Identifier
        // http://thisinterestsme.com/facebook-fbclid-parameter/
        'fbclid',
        // Google Click Identifier
        'gclid',
        // Instagram Share Identifier (appear when click from shortened links that shared outside, e.g. Twitter)
        'igshid',
        // Some other Google Click thing
        'ocid',
        // Google Play affiliate links
        'pcampaignid',
        // Steam - both store and community
        'curator_clanid', // Curator referrer
        'ser', // tracking param in e-mail
        'snr', // often appear in various actions
        // Yandex Copycat (fbclid/gclid)
        'yclid',
        // Generic-ish. Facebook, Product Hunt and others
        'ref',
        // Alibaba-family 'super position model' tracker:
        // https://github.com/newhouse/url-tracking-stripper/issues/38
        'pvid',
        'scm',
        'sm',
        'sourceType',
        'spm',
        'ttid',
        'ut_sk',
        'utparam',
        // YouTube
        'feature', // Short URLs
        'redir_token', // External links redirect token!?
        // GOOLAG FUCKOFF!
        'aqs',
        'bih', // Display size width, are you kidding me? 
        'biw', // Display size height, alright then, is it really necessary for them to know this?
        'cshid',
        'ei', // Track even timestamp of when you make a search and/or when you navigate to other page, encoded epoch value!
        'esrc',
        'fir',
        'oq', // Typed keystrokes before suggestions pick, it's no longer necessary to let them know!
        'psig', // Redirect signature (images)
        'rlz', // Chrome installer tracking!
        'sa',
        'sclient',
        'sxsrf',
        'uact',
        'usg',
        'ust', // same as 'ei', but this expose plain numbers!
        'ved',
        'vet',
        // amazon garbage
        'camp',
        'linkId',
        'creative',
        'linkCode',
        'tag',
        // Facebook More - may affect to non-Facebook too!
        '_ft_',
        // '_rdc', // Redirect counter, commented because this may cause redirect loop in certain actions!
        'acontext', // having issue for search and filtering events, but seems untrusted cuz of long values!
        // 'app_id', // It's bind everytime you click touch menu, possibly break other sites, even Facebook itself.
        // 'appid', // Same as above.
        'aref',
        // 'bacr', // Group feed posts will be stuck in Facebook basic layout and you cannot navigate to older posts.
        'comment_id', // appear when you click user name in comments to see his/her profile
        'c[0]',
        'cref',
        'dti',
        'eid',
        'external_ref',
        'extid',
        'fref',
        'impression_id',
        'lst',
        'referrer',
        'session_id',
        'settings_tracking',
        'sfnsn', // Append when shared any permalink in Facebook externally!
        'source',
        'sourceid', // Track and bind browser client name (Google also use this!)
        'upsell_id',
        // Unknown
        'ncid',
        'nr_email_referer',
        'sqp',
        // random stuff - appears not to break when cleaned during tests
        'sl',
        'tpl',
        'mp',
        'trkid',
        'unlock',
        'mkt_tok'
    ]
};
const MISC_FOR_CLEANING = [
    "*://*.reddit.com/*"
]; // items we want to handle within the cleaning function

const ViaURLS = [
    "*://*.bostonherald.com/*",
    "*://*.fortune.com/*",
    "*://*.huffingtonpost.com/*",
    "*://*.massivelyop.com/*",
    "*://*.nationalreview.com/*",
    "*://*.newsbusters.org/*",
    "*://*.nytimes.com/*",
    "*://*.redstate.com/*",
    "*://*.sfchronicle.com/*",
    "*://*.sfgate.com/*",
    "*://*.slate.com/*",
    "*://*.usatoday.com/*",
    "*://*.vice.com/*",
    "*://*.washingtonexaminer.com/*",
    "*://*.wired.com/*"
];
const UnvisURLS = [];
const OutlineURLS = [
    "*://*.aclu.org/*",
    "*://*.thecollegefix.com/*",
    "*://*.wbir.com/*"
];
const ArchiveURLS =  [
    "*://*.48hills.org/*",
    "*://*.abc.net.au/*",
    "*://*.abcnews/*",
    "*://*.aftonbladet.se/*",
    "*://*.almatcboykin.wordpress.com/*",
    "*://*.althouse.blogspot.com/*",
    "*://*.americanthinker.com/*",
    "*://*.arstechnica.com/*",
    "*://*.ausgamers.com/*",
    "*://*.avclub.com/*",
    "*://*.avoiceformen.com/*",
    "*://*.balkin.blogspot.com/*",
    "*://*.bigleaguepolitics.com/*",
    "*://*.birthmoviesdeath.com/*",
    "*://*.bloomberg.com/*",
    "*://*.boingboing.net/*",
    "*://*.breitbart.com/*",
    "*://*.businessinsider.com/*",
    "*://*.buzzfeed.com/*",
    "*://*.buzzfeed.com/*",
    "*://*.campusreform.org/*",
    "*://*.cassiuslife.com/*",
    "*://*.cjr.org/*",
    "*://*.classicalvalues.com/*",
    "*://*.clickhole.com/*",
    "*://*.cnbc.com/*",
    "*://*.cnn.com/*",
    "*://*.conservapedia.com/*",
    "*://*.cracked.com/*",
    "*://*.dailycaller.com/*",
    "*://*.dailydot.com/*",
    "*://*.dailykos.com/*",
    "*://*.dailymail.co.uk/*",
    "*://*.dailystar.co.uk/*",
    "*://*.dailystormer.is/*",
    "*://*.dailywire.com/*",
    "*://*.deadspin.com/*",
    "*://*.denverpost.com/*",
    "*://*.destructoid.com/*",
    "*://*.dictionary.com/*",
    "*://*.eastbaytimes.com/*",
    "*://*.engadget.com/*",
    "*://*.espn.com/*",
    "*://*.eurogamer.net/*",
    "*://*.everydayfeminism.com/*",
    "*://*.flagandcross.com/*",
    "*://*.foxbusiness.com/*",
    "*://*.foxnews.com/*",
    "*://*.fusion.net/*",
    "*://*.gamasutra.com/*",
    "*://*.gameplanet.co.nz/*",
    "*://*.gamerevolution.com/*",
    "*://*.gamesindustry.biz/*",
    "*://*.gamespot.com/*",
    "*://*.gamesradar.com/*",
    "*://*.gawker.com/*",
    "*://*.gizmodo.com/*",
    "*://*.gothamist.com/*",
    "*://*.gunsinthenews.com/*",
    "*://*.heatst.com/*",
    "*://*.hoodline.com/*",
    "*://*.hoover.org/*",
    "*://*.houstonpress.com/*",
    "*://*.independent.co.uk/*",
    "*://*.infowars.com/*",
    "*://*.io9.com/*",
    "*://*.jalopnik.com/*",
    "*://*.jammiewf.com/*",
    "*://*.jeffro.wordpress.com/*",
    "*://*.jewishworldreview.com/*",
    "*://*.jezebel.com/*",
    "*://*.kcentv.com/*",
    "*://*.kinja.com/*",
    "*://*.kotaku.com/*",
    "*://*.laist.com/*",
    "*://*.latimes.com/*",
    "*://*.littlegreenfootballs.com/*",
    "*://*.mediamatters.org/*",
    "*://*.mercurynews.com/*",
    "*://*.metalsucks.net/*",
    "*://*.morningstaronline.co.uk/*",
    "*://*.motherjones.com/*",
    "*://*.msnbc.com/*",
    "*://*.mu.nu/*",
    "*://*.nbcnews.com/*",
    "*://*.neogaf.com/*",
    "*://*.newmediarockstars.com/*",
    "*://*.newsweek.com/*",
    "*://*.newyork.cbslocal.com/*",
    "*://*.newyorker.com/*",
    "*://*.nymag.com/*",
    "*://*.nypost.com/*",
    "*://*.offworld.com/*",
    "*://*.out.com/*",
    "*://*.pagesix.com/*",
    "*://*.pcauthority.com.au/*",
    "*://*.pcgamer.com/*",
    "*://*.pjmedia.com/*",
    "*://*.pointandclickbait.com/*",
    "*://*.politico.com/*",
    "*://*.polygon.com/*",
    "*://*.powerlineblog.com/*",
    "*://*.rationalwiki.org/*",
    "*://*.rawstory.com/*",
    "*://*.reallifemag.com/*",
    "*://*.recode.net/*",
    "*://*.returnofkings.com/*",
    "*://*.rockpapershotgun.com/*",
    "*://*.rollingstones.com/*",
    "*://*.salon.com/*",
    "*://*.seattlepi.com/*",
    "*://*.sfexaminer.com/*",
    "*://*.sfist.com/*",
    "*://*.spiked-online.com/*",
    "*://*.splinternews.com/*",
    "*://*.sputniknews.com/*",
    "*://*.takimag.com/*",
    "*://*.telegraph.co.uk/*",
    "*://*.theamericanconservative.com/*",
    "*://*.theatlantic.com/*",
    "*://*.theblumpkin.com/*",
    "*://*.thedailybeast.com/*",
    "*://*.thefader.com/*",
    "*://*.thefederalist.com/*",
    "*://*.thegatewaypundit.com/*",
    "*://*.theguardian.com/*",
    "*://*.thehill.com/*",
    "*://*.themarysue.com/*",
    "*://*.theothermccain.com/*",
    "*://*.theoutline.com/*",
    "*://*.theroot.com/*",
    "*://*.therpgpundit.blogspot.com/*",
    "*://*.thesaurus.com/*",
    "*://*.theverge.com/*",
    "*://*.townhall.com/*",
    "*://*.tvblackbox.com.au/*",
    "*://*.vanityfair.com/*",
    "*://*.variety.com/*",
    "*://*.victorygirlsblog.com/*",
    "*://*.vox.com/*",
    "*://*.wapo.com/*",
    "*://*.washingtonpost.com/*",
    "*://*.wehuntedthemammoth.com/*",
    "*://*.worldstarhiphop.com/*",
    "*://*.xkcd.com/*",
    "*://*.xojane.com/*",
    "*://*.yahoo.com/news/*",
    "*://*.yiannopoulos.net/*",
    "*://*.yournewswire.com/*",
    "*://*.zerohedge.com/*"
    // Thai sites section
    "*://*.khaosod.co.th/*",
    "*://*.khaosodenglish.com/*",
    "*://*.matichon.co.th/*",
    "*://*.thairath.co.th/*",
    "*://*.thematter.co/*",
    "*://*.themomentum.co/*",
    "*://*.thestandard.co/*",
    "*://*.voicetv.co.th/*"
];
const archiverDomains = [
    "archive.today",
    "archive.fo",
    "archive.is",
    "archive.li",
    "archive.md",
    "archive.ph",
    "archive.vn"
];

function cleaning(details){
    let url = details.url;

    // deal with reddit
    const redditRegex = new RegExp(/(^http(s)?:\/\/(www\.)?reddit\.com)/);
    const oldRedditRegex = new RegExp(/^http(s)?:\/\/(old\.reddit\.com)/);
    const outRedditRegex = new RegExp(/^http(s)?:\/\/(out\.reddit\.com)/);

    if (url.match(oldRedditRegex)) if (url.endsWith('/')) {
        //console.debug("oldReddit fired)");
        return
    }

    if (url.match(outRedditRegex)) {
        //console.debug("outReddit fired");
        //console.debug(`original url: ${url}`);
        url = stripRedditOutLink(url)
    }

    if (!url.match(oldRedditRegex)) if (url.match(redditRegex)) {
        //console.debug("badReddit can fuck off");
        url = oldReddit(url);
    }

    if(url.endsWith("?singlepage=true")) { return } //do i want this here?

    return cleanUrl(url);
}

// Catch whatever has been produced from TRACKERS_BY_ROOT for cleaning
chrome.webRequest.onBeforeRequest.addListener(
    function(details) {
        // if we're in a mode without cleaning - gtfo
        if(filter_list_state === 1 || filter_list_state === 3) { return }

        return cleaning(details)
    },
    {
        urls: generateTrackerPatternsArray(TRACKERS_BY_ROOT),
        types: ["main_frame"]
    },
    ['blocking']
);

// send directly to archive.is
chrome.webRequest.onBeforeRequest.addListener(
    function(details) {
        if(filter_list_state === 2 || filter_list_state === 3) { return }
        const url = details.url;

        return archiveUrlConstructor(url);
    },
    {
        urls: ArchiveURLS,
        types: ["main_frame"]
    },
    ['blocking'] // don't let the request go until we get back a redirectUrl (or other return in theory)
);

// archive via via.hypothes.is
chrome.webRequest.onBeforeRequest.addListener(
    function(details) {
        if(filter_list_state === 2 || filter_list_state === 3) { return }
        const url = details.url;

        return archiveViaConstructor(url);
    },
    {
        urls: ViaURLS,
        types: ["main_frame"]
    },
    ['blocking']
);

// Commented out until needed
// archive via unv.is
/*chrome.webRequest.onBeforeRequest.addListener(
    function(details) {
        if(filter_list_state === 2 || filter_list_state === 3) { return }
        var url = details.url;

        return archiveUnvConstructor(url);
    },
    {
        urls: UnvisURLS,
        types: ["main_frame"]
    },
    ['blocking']
);*/

// archive using outline.com
chrome.webRequest.onBeforeRequest.addListener(
    function(details) {
        if(filter_list_state === 2 || filter_list_state === 3) { return }
        const url = details.url;

        return outlineConstructor(url);
    },
    {
        urls: OutlineURLS,
        types: ["main_frame"]
    },
    ['blocking']
);

function cleanUrl(url) {
    const strippedUrl = removeTrackersFromUrl(url);

    return { redirectUrl: strippedUrl}
}

function pickArchiver(domains) {
    return domains[Math.floor(Math.random() * domains.length)];
}

function oldReddit(redditUrl) {
    const REDDIT_URL = new RegExp(/(https?:\/\/)(www\.)?(reddit\.com)/);
    return redditUrl.replace(REDDIT_URL, "$1old.$3");
}

function stripRedditOutLink(redditUrl) {
    const REDDIT_URL = new RegExp(/(^https?:\/\/out\.reddit\.com\/.*\??url=)(https?.+?)(&.*)/);
    let intermediateUrl = redditUrl.replace(REDDIT_URL, "$2");
    //console.debug(`intermediate url: ${intermediateUrl}`);
    intermediateUrl = intermediateUrl.replace(/%3A/g, ":");
    //console.debug(`intermediate url: ${intermediateUrl}`);
    let finalUrl = intermediateUrl.replace(/%2F/g, "/");
    //console.debug(`final url: ${finalUrl}`);
    return finalUrl;
}

// build the archive.is request url using via.hypothes.is
function archiveViaConstructor(url) {
    const archiver = `https://${pickArchiver(archiverDomains)}/?run=1&url=https://via.hypothes.is/`;
    const finalUrl = archiver + url;

    return { redirectUrl: finalUrl };
}

// build the archive.is request url using unv.is
function archiveUnvConstructor(url) {
    const archiver = `https://${pickArchiver(archiverDomains)}/?run=1&url=https://unv.is/`;
    const finalUrl = archiver + url.replace(/(http|https):\/\//, '');

    return { redirectUrl: finalUrl };
}

// SLATED FOR REMOVAL
// build the archive.is request url using outline.com
function archiveOutlineConstructor(url) {
    const archiver = `https://${pickArchiver(archiverDomains)}/?run=1&url=https://outline.com/`;
    const finalUrl = archiver + url;

    return { redirectUrl: finalUrl };
}

function outlineConstructor(url) {
    const archiver = 'https://outline.com/';
    const finalUrl = archiver + url;

    return { redirectUrl: finalUrl}
}

// Build the archive.is request url
function archiveUrlConstructor(url){
    const archiver = `https://${pickArchiver(archiverDomains)}/?run=1&url=`;

    // pjmedia crap
    const pjmedia_singlepage = '?singlepage=true'; // avoid the irritating More button
    const pjmediaRegex = new RegExp(/(pjmedia\.com)/); // detect we're on pjmedia site
    if(url.endsWith(pjmedia_singlepage)) {
        return { redirectUrl: archiver + url}
    }
    if(url.match(pjmediaRegex)) { // avoid pjmedia More button bullshit

        return { redirectUrl: archiver + url + pjmedia_singlepage };
    }

    // fallthrough option so to speak - our basic use
    return { redirectUrl: archiver + url };
}

// shamelessly stolen from the excellent https://github.com/newhouse/url-tracking-stripper whose code I've really
// enjoyed

// Go through all the trackers by their root and turn them into a big regex...
const TRACKER_REGEXES_BY_ROOT = {};
for (let root in TRACKERS_BY_ROOT) {
    // Old way, matching at the end 1 or unlimited times.
    // TRACKER_REGEXES_BY_ROOT[root] = new RegExp("((^|&)" + root + "(" + TRACKERS_BY_ROOT[root].join('|') + ")=[^&#]+)", "ig");
    // New way, matching at the end 0 or unlimited times. Hope this doesn't come back to be a problem.
    TRACKER_REGEXES_BY_ROOT[root] = new RegExp(`((^|&)${root}(${TRACKERS_BY_ROOT[root].join('|')})=[^&#]*)`, "ig");
}

// Generate the URL patterns used for webRequest filtering
// https://developer.chrome.com/extensions/match_patterns
function generateTrackerPatternsArray(TRACKERS_BY_ROOT) {
    const array = [];
    for (let root in TRACKERS_BY_ROOT) {
        for (let i=0; i < TRACKERS_BY_ROOT[root].length; i++) {
            array.push( `*://*/*?*${root}${TRACKERS_BY_ROOT[root][i]}=*` );
        }
    }
    for (let i in MISC_FOR_CLEANING) {
        array.push(MISC_FOR_CLEANING[i])
    }
    return array;
}

// Actually strip out the tracking codes/parameters from a URL and return the cleansed URL
function removeTrackersFromUrl(url) {
    if (!url) return url;

    const urlPieces = url.split('?');

    // If no params, nothing to modify
    if (urlPieces.length === 1) {
        return url;
    }

    // Go through all the pattern roots
    for (let root in TRACKER_REGEXES_BY_ROOT) {
        // If we see the root in the params part, then we should probably try to do some replacements
        if (urlPieces[1].indexOf(root) !== -1) {
            urlPieces[1] = urlPieces[1].replace(TRACKER_REGEXES_BY_ROOT[root], '');
        }
    }

    // If we've collapsed the URL to the point where there's an '&' against the '?'
    // then we need to get rid of that.
    while (urlPieces[1].charAt(0) === '&') {
        urlPieces[1] = urlPieces[1].substr(1);
    }

    return urlPieces[1] ? urlPieces.join('?') : urlPieces[0];
}
