#!/usr/bin/env node
'use strict';

const WebSocket = require('ws');
const readline = require('readline');

// 颜色输出
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  white: '\x1b[37m',
};

function log(msg, color = 'white') {
  console.log(colors[color] + msg + colors.reset);
}

// 花色符号
const SUIT_SYMBOLS = {
  spade: '♠',
  heart: '♥',
  diamond: '♦',
  club: '♣',
};

// 花色颜色
const SUIT_COLORS = {
  spade: 'white',
  heart: 'red',
  diamond: 'red',
  club: 'white',
};

function formatCard(card) {
  if (card === 'back') return '[??]';
  const symbol = SUIT_SYMBOLS[card.suit] || card.suit;
  const color = SUIT_COLORS[card.suit] || 'white';
  return colors[color] + symbol + card.rank + colors.reset;
}

function formatCards(cards) {
  if (!cards || cards.length === 0) return '无牌';
  return cards.map(formatCard).join(' ');
}

class PokerObserver {
  constructor(serverUrl) {
    this.serverUrl = serverUrl;
    this.ws = null;
    this.roomId = null;
    this.playerId = null;
    this.state = null;
  }

  connect() {
    return new Promise((resolve, reject) => {
      this.ws = new WebSocket(this.serverUrl);

      this.ws.on('open', () => {
        log('✓ 已连接到服务器', 'green');
        resolve();
      });

      this.ws.on('error', (err) => {
        log('✗ 连接错误: ' + err.message, 'red');
        reject(err);
      });

      this.ws.on('close', () => {
        log('✗ 连接已断开', 'red');
        process.exit(0);
      });

      this.ws.on('message', (data) => {
        try {
          const msg = JSON.parse(data);
          this.handleMessage(msg);
        } catch (err) {
          log('✗ 消息解析错误: ' + err.message, 'red');
        }
      });
    });
  }

  send(msg) {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(msg));
    }
  }

  joinRoom(roomId) {
    log('正在观察房间: ' + roomId, 'cyan');
    this.send({
      type: 'observe_room',
      roomId: roomId,
      name: 'Observer_' + Math.random().toString(36).slice(2, 6).toUpperCase(),
    });

    // 每5秒自动刷新显示
    setInterval(() => {
      if (this.state) {
        this.displayState();
      }
    }, 5000);
  }

  handleMessage(msg) {
    switch (msg.type) {
      case 'observer_joined':
        this.roomId = msg.roomId;
        this.observerId = msg.observerId;
        log('✓ 已进入观察模式: ' + this.roomId, 'green');
        break;

      case 'state':
        this.state = msg.state;
        this.displayState();
        break;

      case 'error':
        log('✗ 错误: ' + msg.msg, 'red');
        break;

      default:
        // 忽略其他消息
        break;
    }
  }

  displayState() {
    if (!this.state) return;

    console.clear();
    log('═══════════════════════════════════════════════════════════', 'bright');
    log('                    德州扑克观察者                          ', 'cyan');
    log('═══════════════════════════════════════════════════════════', 'bright');
    log('房间: ' + this.state.roomId + ' | 局数: ' + this.state.handNo, 'yellow');
    log('───────────────────────────────────────────────────────────', 'white');

    // 显示公共牌
    if (this.state.community && this.state.community.length > 0) {
      log('公共牌: ' + formatCards(this.state.community), 'bright');
    } else {
      log('公共牌: 暂无', 'white');
    }
    log('───────────────────────────────────────────────────────────', 'white');

    // 显示所有玩家手牌
    log('玩家手牌:', 'bright');
    for (const p of this.state.players) {
      if (p.kicked) continue; // 跳过被踢出的玩家

      const cardsStr = p.cards && p.cards.length > 0 ? formatCards(p.cards) : '无牌';
      let nameColor = 'white';
      if (p.folded) nameColor = 'yellow';
      else if (!p.connected) nameColor = 'red';

      log('  ' + p.name + ': ' + cardsStr, nameColor);
    }

    log('═══════════════════════════════════════════════════════════', 'bright');
  }
}

// 主程序
async function main() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.log('用法: node observer.js <房间号> [服务器地址]');
    console.log('');
    console.log('示例:');
    console.log('  node observer.js ABC123');
    console.log('  node observer.js ABC123 ws://192.168.1.100:3000');
    console.log('');
    process.exit(1);
  }

  const roomId = args[0];
  const serverUrl = args[1] || 'ws://localhost:3000';

  log('德州扑克观察者客户端', 'bright');
  log('服务器: ' + serverUrl, 'cyan');
  log('房间号: ' + roomId, 'cyan');
  log('', 'white');

  const observer = new PokerObserver(serverUrl);

  try {
    await observer.connect();
    observer.joinRoom(roomId);
  } catch (err) {
    log('✗ 启动失败: ' + err.message, 'red');
    process.exit(1);
  }

  // 处理退出信号
  process.on('SIGINT', () => {
    log('\n正在退出...', 'yellow');
    if (observer.ws) {
      observer.ws.close();
    }
    process.exit(0);
  });
}

main();
