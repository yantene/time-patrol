FROM debian:bookworm-slim

ENV LANG "C.UTF-8"

# Prepare
RUN \
  apt-get update -y && \
  apt-get upgrade -y

# Add dev user
ARG UID=1000
ARG GID=1000
ARG USERNAME=devuser
ARG GROUPNAME=devusers
RUN \
  apt-get install -y sudo && \
  groupadd --gid ${GID} -o ${GROUPNAME} && \
  useradd --uid ${UID} --gid ${GID} --shell /usr/bin/fish -m -o ${USERNAME} && \
  echo "${USERNAME} ALL=(ALL) NOPASSWD: ALL" > /etc/sudoers.d/${USERNAME}

# Setup shell
RUN \
  apt-get install -y fish curl && \
  sudo -u ${USERNAME} fish -c ' \
  curl -sL https://git.io/fisher | source && \
  fisher install jorgebucaran/fisher && \
  fisher install pure-fish/pure \
  '

# Install tools
RUN \
  apt-get install -y \
  tmux \
  git \
  gh \
  openssh-client \
  neovim \
  ripgrep \
  bat \
  exa \
  fd-find && \
  curl -L 'https://github.com/dandavison/delta/releases/download/0.13.0/delta-0.13.0-x86_64-unknown-linux-musl.tar.gz' | tar xz -C /tmp && \
  mv /tmp/delta-0.13.0-x86_64-unknown-linux-musl/delta /usr/local/bin && \
  rm -rf /tmp/delta-0.13.0-x86_64-unknown-linux-musl && \
  curl -L 'https://github.com/lotabout/skim/releases/download/v0.9.4/skim-v0.9.4-x86_64-unknown-linux-musl.tar.gz' | tar xz -C /tmp && \
  mv /tmp/sk /usr/local/bin

# Install asdf
ARG ASDF_VERSION=0.10.2
RUN \
  sudo -u ${USERNAME} fish -c " \
  git clone https://github.com/asdf-vm/asdf.git /home/${USERNAME}/.asdf --branch v${ASDF_VERSION} && \
  mkdir -p /home/${USERNAME}/.config/fish/completions && \
  ln -s /home/${USERNAME}/.asdf/completions/asdf.fish /home/${USERNAME}/.config/fish/completions && \
  mkdir -p /home/${USERNAME}/.config/fish/conf.d && \
  echo 'source ~/.asdf/asdf.fish' > /home/${USERNAME}/.config/fish/conf.d/asdf.fish \
  "

# Install nodejs
# cf. https://github.com/nodejs/node/blob/main/BUILDING.md#building-nodejs-on-supported-platforms
ARG NODE_VERSION=16.15.1
RUN \
  apt-get install -y python3 g++ make python3-pip && \
  sudo -u ${USERNAME} fish -c " \
  asdf plugin add nodejs && \
  asdf install nodejs ${NODE_VERSION} && \
  asdf global nodejs ${NODE_VERSION} \
  "

# Copy .config/
COPY ./.devcontainer/docker/config/ /home/${USERNAME}/.config
RUN \
  chown devuser:devusers -R /home/${USERNAME}/.config

WORKDIR /workspace

EXPOSE 3000

CMD ["/usr/bin/tail", "-f", "/dev/null"]
