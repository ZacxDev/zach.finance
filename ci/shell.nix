{ pkgs ? import <nixpkgs> {}, ... }:

pkgs.mkShell {
  buildInputs = with pkgs;
  [
    go_1_20
    bazel_6
    jdk11
    doctl
  ];
}

