FROM debian:bullseye-20220822-slim as foundry-build

SHELL ["/bin/bash", "-c"]

WORKDIR /opt

ENV DEBIAN_FRONTEND=noninteractive
RUN apt-get update && \
    apt-get install -y curl build-essential git && \
    curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs > rustup.sh && \
    chmod +x ./rustup.sh && \
    ./rustup.sh -y

COPY ./.foundryrc ./.foundryrc

# Only diff from upstream docker image is this clone instead
# of COPY. We select a specific commit to use.
RUN git clone https://github.com/foundry-rs/foundry.git ./foundry \
  && cd foundry && git checkout $(cat ../.foundryrc)

WORKDIR /opt/foundry

RUN source $HOME/.profile && \
    cargo build --release && \
    strip /opt/foundry/target/release/forge && \
    strip /opt/foundry/target/release/cast && \
    strip /opt/foundry/target/release/anvil