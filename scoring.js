export const TYPES = {
  A: {
    name: '未来提示型',
    catch: '「行きたい未来」を言葉にして、仲間の心に火を灯す人。',
    strength: '目的や可能性を、仲間が自分ごとにできる言葉へ変える力があります。',
    blindSpot: '未来を急ぐあまり、仲間が今どこで迷っているかを置き去りにすることがあります。',
    next: '次の会議で「この挑戦が実現したら、誰にどんな景色を見せられる？」を一人ずつ聞いてみましょう。',
  },
  B: {
    name: '関係構築型',
    catch: '一人ひとりの声を拾い、安心して本音を出せる場をつくる人。',
    strength: '違いを対立にせず、仲間の気持ちや背景を理解して関係性を育てられます。',
    blindSpot: '全員に配慮するほど、決めるべきことを先送りにしてしまうことがあります。',
    next: '話を聴いた後に「ここまでを踏まえて、今日は何を決める？」と着地を一文で置いてみましょう。',
  },
  C: {
    name: '自走設計型',
    catch: '目的・役割・権限を整え、仲間が自ら動ける土台をつくる人。',
    strength: '任せる範囲と判断基準を整理し、再現性のあるチームの進め方を設計できます。',
    blindSpot: '仕組みを整えることに集中しすぎて、挑戦への熱量が伝わりにくくなることがあります。',
    next: '任せる仕事に「これは誰のために、何を変える仕事か」を一言添えて渡してみましょう。',
  },
  D: {
    name: '推進突破型',
    catch: '迷った時に最初の一歩をつくり、チームを前へ進める人。',
    strength: '曖昧な状況でも動き出し、停滞を突破するエネルギーと決断力があります。',
    blindSpot: '自分が進めるほど、仲間が「やらされる側」になってしまうことがあります。',
    next: '次に動く前に「あなたなら、ここから何を選ぶ？」と仲間へ選択肢を渡してみましょう。',
  },
};

export function diagnose(answers) {
  if (!Array.isArray(answers) || answers.length !== 8) throw new Error('8 answers are required');
  if (answers.some((answer) => !TYPES[answer])) throw new Error('answers must be A, B, C, or D');
  const counts = Object.fromEntries(Object.keys(TYPES).map((key) => [key, 0]));
  answers.forEach((answer) => { counts[answer] += 1; });
  const max = Math.max(...Object.values(counts));
  const tiedKeys = Object.keys(TYPES).filter((key) => counts[key] === max);
  const primaryKey = answers.find((answer) => tiedKeys.includes(answer));
  return { primaryKey, type: TYPES[primaryKey], counts, tiedKeys };
}

export function shuffleChoices(choices, random = Math.random) {
  const shuffled = [...choices];
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const target = Math.floor(random() * (index + 1));
    [shuffled[index], shuffled[target]] = [shuffled[target], shuffled[index]];
  }
  return shuffled;
}
