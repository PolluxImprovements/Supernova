const locale = require('../../../utils/multilang_b');
const mm = locale.getT();
const gear = require("../../gearbox.js")
const cmd = 'cash';

const init = function (message,userDB,DB) {
    const Author = message.author;
    const Target = message.target;
    const MTarget = message.mentions.members.first() || message.mentions.users.first()  || message.member;
    const MSG = message.content;
    const LANG = message.lang;

//HELP TRIGGER
    let helpkey = mm("helpkey",{lngs:message.lang})
if (MSG.split(/ +/)[1]==helpkey || MSG.split(/ +/)[1]=="?"|| MSG.split(/ +/)[1]=="help"){
    return gear.usage(cmd,message,this.cat);
}
//------------

const P={lngs:LANG}
    const vocab = {
        c1: mm("$.cash10", P),
        c2: mm("$.cash100", P),
        c3: mm("$.cash500", P),
        c4: mm("$.cash1000", P),
        c5: mm("$.cash5000", P),
        c6: mm("$.cash10000", P),
        c7: mm("$.cashInfinite", P),
        heHas: gear.emoji("rubine")+`**${MTarget.displayName}**`+mm("$.hasAmount", {
            lngs: LANG,
            goods: "**"+gear.miliarize(Target.dDATA.modules.rubines,"strict")+"**"
        }),
        youHave: gear.emoji("rubine")+`**${MTarget.displayName}**`+mm("$.youAmount", {
            lngs: LANG,
            goods: "**"+gear.miliarize(Author.dDATA.modules.rubines,"strict")+"**"
        })
    }

    if (message.mentions.users.size === 0) {
        let r = Target.dDATA.modules.rubines
        let fam = ''
        switch (true) {
            case (r < 500):
                fam = vocab.c1
                break;
            case (r < 1000):
                fam = vocab.c2
                break;
            case (r < 2500):
                fam = vocab.c3
                break;
            case (r < 5000):
                fam = vocab.c4
                break;
            case (r < 1000):
                fam = vocab.c5
                break;
            case (r < 19999):
                fam = vocab.c6
                break;
            case (r > 20000):
                fam = vocab.c7
                break;
        }
        return message.reply(vocab.youHave + fam);
    };
    return message.channel.send(vocab.heHas);
};

 module.exports = {
    pub:true,
    cmd: cmd,
    perms: 3,
    init: init,
    cat: '$'
};