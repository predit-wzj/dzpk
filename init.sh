#!/bin/bash
set -e

echo "=== 德州扑克 初始化部署 ==="

# 检查 Node.js
if ! command -v node &>/dev/null; then
  echo "[1/5] 安装 Node.js..."
  curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
  sudo apt-get install -y nodejs
else
  echo "[1/5] Node.js 已安装: $(node -v)"
fi

# 安装依赖
echo "[2/5] 安装 npm 依赖..."
npm install --production

# 检查配置文件
echo "[3/5] 检查配置文件..."
if [ ! -f "conf.env" ]; then
  echo "      警告: conf.env 不存在，创建默认配置文件"
  cat > conf.env << 'EOF'
# 德州扑克游戏配置文件

# 背景音乐直链（支持 .mp3 格式）
# 可以使用网易云音乐直链、其他音乐平台直链或本地文件
# 示例：BGM_URL=https://music.163.com/song/media/outer/url?id=歌曲ID.mp3
# 或本地文件：BGM_URL=/bgm.mp3
BGM_URL=
EOF
  echo "      已创建 conf.env，请编辑配置背景音乐"
else
  echo "      conf.env 已存在"
fi

# 创建日志目录
echo "[4/5] 准备日志文件..."
touch run.log
touch res.log
echo "      日志文件已准备"

# 启动服务（用 pm2 或直接 node）
echo "[5/5] 启动服务..."
if command -v pm2 &>/dev/null; then
  pm2 delete dzpk 2>/dev/null || true
  pm2 start server.js --name dzpk
  pm2 save
  echo ""
  echo "=== 启动成功（pm2 守护进程）==="
  echo "查看日志: pm2 logs dzpk"
  echo "停止服务: pm2 stop dzpk"
  echo "重启服务: pm2 restart dzpk"
else
  echo "      pm2 未安装，尝试安装..."
  sudo npm install -g pm2
  pm2 delete dzpk 2>/dev/null || true
  pm2 start server.js --name dzpk
  pm2 save
  # 设置开机自启
  pm2 startup | tail -1 | sudo bash || true
  echo ""
  echo "=== 启动成功（pm2 守护进程）==="
  echo "查看日志: pm2 logs dzpk"
  echo "停止服务: pm2 stop dzpk"
  echo "重启服务: pm2 restart dzpk"
fi

# 获取本机 IP
LOCAL_IP=$(hostname -I 2>/dev/null | awk '{print $1}' || echo "localhost")
echo ""
echo "=== 部署完成 ==="
echo "访问地址: http://${LOCAL_IP}:3000"
echo "配置文件: conf.env"
echo "运行日志: run.log"
echo "结算日志: res.log"
echo ""
