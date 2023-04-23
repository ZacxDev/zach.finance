{ pkgs ? import <nixpkgs> {}, ... }:

pkgs.mkShell {
  buildInputs = with pkgs;
  let
    tilt = buildGoModule rec {
      pname = "tilt";
      version = "0.32.2";

      src = fetchFromGitHub {
        owner = "tilt-dev";                                             
        repo = pname;
        rev = "v${version}";
        sha256 = "sha256-Wn7e2g1KPnFgFuRPUh3g0FW/m0qRHV5reO+AZbhbaC8=";
      };

      vendorSha256 = null;

      subPackages = [ "cmd/tilt" ];

      ldflags = [ "-X main.version=${version}" ];
    };
  in
    [
    bazel_6
    kube3d
    tilt
    go_1_19
    gopls
    jdk11
    kubectl
    nodejs-18_x
  ];
}

