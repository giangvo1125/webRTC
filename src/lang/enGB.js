const Language = {
    application: {
        name: 'Sportsbook',
        copyright: '@ 2017'
    },
    headers: {
        homeMenu: 'Home', 
        gameMenu: 'Games', 
        casinoMenu: 'Casino', 
        stepMenu: 'Step', 
        welcomeLabel: 'Welcome', 
        creditLabel: 'Credit', 
        preferenceLabel: 'Preferences', 
        logoutLabel: 'Logout', 
    },
    mainMenu: {
        betListMenu:  'Bet List', 
        statementMenu: 'Statement', 
        myAccountMenu: 'My Account', 
        resultMenu: 'Result', 
    }, 
    favoritePanel: {
        title: 'My Favorite', 
    }, 
    fundTransferPanel: {
        title: 'Fund Transfer', 
        totalBalance: 'Total Balance', 
        sportBookBalance: 'Sportsbook Balance', 
        transferEGameBalance: 'Transfer E-Game Balance', 
        eGamesBalance: 'E-Games Balance', 
        cashOut: 'Cash Out', 
        transfer: 'Transfer'
    },
    sportMenuPanel: {
        title: 'Sports Menu', 
        early: 'Early', 
        today: 'Today', 
        live: 'Live', 
        soccer: 'Soccer', 
        basketball: 'Basketball', 
        poolSnooker: 'Pool/Snooker', 
        tennis: 'Tennis', 
        hockey: 'Hockey', 
        handball: 'Handball', 
        volleyball: 'Volleyball', 
        muayThai: 'MuayThai', 
        hdpOu: 'HDP & OU', 
        oddEvenTotalGoal:'Odd/Even & Total Goal', 
        doubleChange:'1x2 & Double Chance', 
        correctScore: 'Correct Score', 
        htft: 'Half Time/Full Time', 
        goal: 'First Goal/Last Goal', 
        mixParlay: 'Mix Parlay', 
        outright: 'Outright', 
        baseball: 'Baseball', 
        football: 'Football', 
        palay: 'Parlay', 
        'e sports': 'E Sports', 
        badminton: 'Badminton', 
    },
    statusBetPanel: {
        title: 'Waiting & Cancelled', 
        waitingBet: 'Waiting Bet', 
        void: 'Void', 
        noBet: 'No bet(s)', 
    }, 
    menuFilter: {
        selectLeagueTitle: 'SELECT LEAGUE', 
        titleToDay: 'Today Events', 
        titleEarly: 'Early Events', 
        titleLive: 'Live Events', 
        titleOutright: 'Outright', 
        titleMixParlay: 'Mix Parlay', 
        titleHTFT: 'HT/FT', 
        titleGoal: 'FG/LG', 
        sortByLeague: 'Sort by League', 
        sortByTime: 'Sort by Time', 
        selectLeague: 'Select League', 
        refresh: 'Refresh', 
        tableType: [
            {label: 'Single', value: 0, active: false}, 
            {label: 'Double', value: 1, active: true} , 
            {label: 'Simple', value: 2, active: false} 
        ], 
        currency: [
            {label: 'MY', value: 0, active: true}, 
            {label: 'HK', value: 1, active: false}, 
            {label: 'ID', value: 2, active: false}, 
            {label: 'EU', value: 3, active: false}
        ], 
        selectAllBtn: 'Select All', 
        deSelectAllBtn: 'DeSelect All', 
        okBtn: 'OK', 
        titleDoubleChance: '1X2 & DC', 
        titleOddEvenTotalGoal: 'O/E & TG', 
        titleCorrectScore: 'CS', 
    }, 
    tableDouble: {
        time: 'Time', 
        event: 'Event', 
        ftHdp: 'FT.HDP', 
        ftOu: 'FT.O/U', 
        ft1x2: 'FT.1x2', 
        oe: 'O/E', 
        fhHdp: '1H.HDP', 
        fhOu: '1H.O/U', 
        fh1x2: '1H.1x2', 
    }, 
    betPanel: {
        titleHDP: ' / Handicap', 
        titleOu: ' / Over/Under', 
        title1x2: ' / 1X2', 
        titleOe: ' / Odd/Even', 
        titleOutRight: ' / Outright', 
        titleOddEven: ' / Odd/Even', 
        titleTotalGoal: ' / Total Goal',
        titleDoubleChance: ' / Double Chance', 
        titleParlay: ' / Mix Parlay', 
        titleCorrectScore: ' / Correct Score', 
        titleHTFT: ' / Half Time/Full Time', 
        titleGoal: ' / FG/LG', 
        amount: 'Amount', 
        acceptOdds: 'Accept better odds', 
        maxPayout: 'Max Payout', 
        minBet: 'Min Bet', 
        maxBet: 'Max Bet',
        processBet: 'Process Bet', 
        cancelBet: 'Cancel', 
        over: 'OVER', 
        under: 'UNDER', 
        firstHalf: 'First Half', 
        oddEven: ['ODD', 'EVEN'], 
        totalGoal: '(TOTAL GOAL)', 
        doubleChance: '(DOUBLE CHANCE)', 
        totalGoalType: ['0-1', '2-3', '4-6', '7&Over'], 
        doubleChanceType: ['1X', '2X', '12'], 
        correctScoreType: ['AOS', '0-0','0-1','0-2','0-3','1-0', '1-1', '1-2', '1-3', '2-0', '2-1', '2-2', '2-3', '3-0', '3-1', '3-2', '3-3', '4-0', '4-1', '4-2', '4-3', '1-4', '2-4', '3-4', '4-4'], 
        halfTimeFullTime: '(HALF TIME/FULL TIME)', 
        HTFT: ['HH', 'HD', 'HA', 'DH', 'DD', 'DA', 'AH', 'AD', 'AA'], 
        goalType: ['(First Goal)', '(Last Goal)', '(First Goal)', '(Last Goal)', '(No Goal)'], 
    }, 
    betList: {
        title: ' Bet List', 
        stt: 'No', 
        type: 'Type', 
        date: 'Date', 
        event: 'Event', 
        detail: 'Detail', 
        stake: 'Stake', 
        status: 'Status',
        result: 'Result', 
        com: 'Com', 
        wl: 'W/L', 
        sides: [
            {team: 1, label: 'HDP', string: 'Handicap', status: 'TEAM1_SPREAD'}, 
            {team: 2, label: 'HDP', string: 'Handicap', status: 'TEAM2_SPREAD'}, 
            {team: 1, label: 'O/U', string: 'O/U', status: 'OVER'}, 
            {team: 2, label: 'O/U', string: 'O/U', status: 'UNDER'}, 
            {team: 1, label: '1x2', string: '1x2', status: 'TEAM1_MONEY'}, 
            {team: 2, label: '1x2', string: '1x2', status: 'TEAM2_MONEY'}, 
            {team: 3, label: '1x2', string: '1x2', status: 'DRAW_MONEY'}, 
            {team: 4, label: '1x2', string: '1x2', status: 'NO_DRAW_MONEY'}, 
            {team: 1, label: 'O/E', string: 'O/E', status: 'ODD'},
            {team: 2, label: 'O/E', string: 'O/E', status: 'EVEN'},  
            {team: 1, label: 'Outright', string: 'Outright', status: 'TEAM1_OUTRIGHT'}, 
            {team: 1, label: 'Total Goal', string: 'Total Goal', status: 'ZERO_ONE'},
            {team: 2, label: 'Total Goal', string: 'Total Goal', status: 'TWO_THREE'},
            {team: 3, label: 'Total Goal', string: 'Total Goal', status: 'FOUR_SIX'},
            {team: 4, label: 'Total Goal', string: 'Total Goal', status: 'SEVEN_OVER'},
            {team: 1, label: 'Double Chance', string: 'Double Chance', status: 'WIN_DRAW1'},
            {team: 2, label: 'Double Chance', string: 'Double Chance', status: 'WIN_DRAW2'},
            {team: 3, label: 'Double Chance', string: 'Double Chance', status: 'TEAM1_TEAM2'},
            {team: 0, label: 'PAR', string: 'PARLAY', status: ''},

        ], 
        statusTicket: [
            'FAIL', 
            'ACCEPTED', 
            'WAITING', 
            'WON', 
            'LOSE', 
            'REFUNDED', 
            'LINE_ODD_CHANGED', 
            'MAX_WAGER', 
            'EXCEPTION_BEFORE_COMFIRM', 
            'EXCEPTION_AFTER_COMFIRM', 
            'ZERO_AMOUNT', 
            'BELOW_MIN_BET', 
            'BALANCE_EXCEEDED', 
            'DRAW', 
            'REJECTED', 
            'UNAVAILABLE_GAME', 
        ], 
        over: 'OVER', 
        under: 'UNDER', 
        draw: 'DRAW', 
        firstHalf: 'First Half', 
        odd: 'ODD', 
        even: 'EVEN', 
        zeroOne: '(1 - 0)', 
        twoThree: '(2 - 3)', 
        fourSix: '(4 - 6)', 
        sevenOver: '(7 & over)', 
        betListMiniTitle: 'Bet List (Mini)', 
        waitingBetTitle: 'Waiting Bet', 
        voidTitle: 'Void', 
        runningStatus: 'Running', 
        waitingStatus: 'Waiting', 
        rejectStatus: 'Reject', 
        WIN_DRAW1: '(1X)', 
        WIN_DRAW2: '(2X)', 
        TEAM1_TEAM2: '(12)', 
        PAR: 'PARLAY', 

    }, 
    statementList: {
        title: 'Statement', 
        date: 'Date', 
        stake: 'Stake', 
        winlose: 'W/L', 
        com: 'Com', 
        settled: 'Settled', 
        balance: 'Balance', 
        lastweek: 'Last Week', 
        thisweek: 'This Week', 
    }, 
    userAccountInfo: {
        username: 'User Name', 
        totalBalance: 'Total Balance', 
        sportBookBalance: 'Sportsbook Balance', 
        eGameBalance: 'E-Games Balance', 
        currency: 'Currency', 
        sportBookCreditLimit: 'Sportsbook Credit Limit', 
        remainingSportBookCreditLimit: 'Remaining Sportsbook Credit Limit', 
        eGamesCreditLimit: 'E-Games Credit Limit', 
        minMaxBet: 'Min/Max Bet', 
        totalOutStanding: 'Total Outstanding', 
        title: 'Account Info', 
    }, 
    result: {
        title: 'Result', 
        sortBy: 'Sort By', 
        date: 'Date', 
        today: 'Today', 
        yesterday: 'Yesterday', 
        select: 'Select', 
        submit: 'Submit', 
        kickOffTime: 'Kickoff Time', 
        match: 'Match', 
        firstHalfScore: 'First Half Score', 
        fullTimeScore: 'Full Time Score', 
        league: 'League', 
        time: 'Time', 
    }, 
    tableSimple: {
        time: 'Time', 
        event: 'Event', 
        fullTime: 'Full time', 
        firstHalf: 'First half', 
        hdp: 'HDP', 
        home: 'H', 
        away: 'A', 
        goal: 'GOAL', 
        over: 'Over', 
        under: 'Under', 
    }, 
    tableOutRight: {
        outright: 'Outright', 
        win: 'Win'
    }, 
    message: {
        oddChange: 'ODD CHANGE TO ', 
        unavailableGame: 'There is an unavailable game!', 
    }, 
    preferenceDetail: {
        title: 'Settings', 
        nickName: 'Nick Name:', 
        language: 'Language:', 
        oddType: 'Odds Type:', 
        oddView: 'Odds View:', 
        defaultStake: 'Default Stake:', 
        acceptOdds: 'Accept better odds:', 
        sortBy: 'Sort by:', 
        thb:'THB',  
        saveBtn: 'Save', 
        closeBtn: 'Close', 
        changePassLink: 'Change Password', 
        preferenceLink: 'Preferences', 
        double: 'Double', 
        simple: 'Simple', 
        single: 'Single', 
        disable: 'Disable', 
        enable: 'Enable', 
        time: 'Time', 
        league: 'League', 
        yes: 'Yes', 
        no: 'No', 
    }, 
    changePassword: {
        username: 'User Name', 
        oldpass: 'Old Password', 
        newpass: 'New Password', 
        confirmpass: 'Confirm Password', 
        saveBtn: 'Save', 
        resetBtn: 'Reset',
        requireLenCharacters: '*Your password must contain 8-15 characters.', 
        requireCombinationPassword: '*Your password must include a combination of alphabetic characters and numbers.', 
        requirePathPassword: '*Your password must not contain your login name, first and last name.', 
        requireExpirePassword: '*Your password will expire 60 days after your last update.',  
        passwordInvalid: 'Invalid Password.', 
        passwordNotMatch: 'New Password and Confirm Password not match.', 
        changeSuccess: 'Update Success!!', 
        settingTitle: 'Settings', 
        changePassTitle: 'Change Password', 
        preferenceTitle: 'Preferences', 
    }, 
    home: {
        header: {
            namePlaceHolder: 'USERNAME', 
            passPlaceHolder: 'PASSWORD', 
            loginBtn: 'Login', 
            aboutus: 'About Us', 
            bettingrules: 'Betting Rules', 
            helpfaq: 'Help & FAQ', 
            contactus: 'Contact Us', 
            whychooseus: 'Why Choose Us', 
        }, 
    }, 
};

module.exports = Language;
