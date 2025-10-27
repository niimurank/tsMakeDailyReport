const temp = {   
    common:{
        workType:"■出社/在宅",
        business:"■業務─────────────────",
        remaining:"【残タスク】",
        share:"■共有事項"
    },
    morning : {
        greeting_1:"おはようございます。",
        greeting_2:"本日のタスクを報告いたします。"
    },
    evening : {
        greeting_1:"お疲れ様です。",
        greeting_2:"本日の業務を終了します。"
    }
};

if (typeof window !== "undefined") {
    window.temp = temp;
}
