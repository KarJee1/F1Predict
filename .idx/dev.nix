# To learn more about how to use Nix to configure your environment
# see: https://developers.google.com/idx/guides/customize-idx-env
{ pkgs, ... }: {
  # Which nixpkgs channel to use.
  channel = "stable-25.05";
  # Use https://search.nixos.org/packages to find packages
  packages = [ pkgs.nodejs_20 ];
  # Sets environment variables in the workspace
  env = { EXPO_USE_FAST_RESOLVER = "1"; };
  idx = {
    # Search for the extensions you want on https://open-vsx.org/ and use "publisher.id"
    extensions = [
      "msjsdiag.vscode-react-native"
    ];
    workspace = {
      # Runs when a workspace is first created with this `dev.nix` file
      onCreate = {
        install =
          "npm ci --prefer-offline --no-audit --no-progress --timing && npm i @expo/ngrok@^4.1.0 && npm install -g eas-cli";
      };
    };
    previews = {
      enable = true;
      previews = {
        android = {
          manager = "android";
          command = [
            "echo"
            "-e"
            "\"\\033[1;3dStarting Android emulator...\\033[0m\""
            "&&"
            "/usr/bin/emulator-is-ready.sh"
            "&"
            "/usr/bin/suite"
            "--background=/usr/bin/emulator-is-ready.sh"
            "--foreground=npm run android -- --tunnel"
          ];
        };
      };
    };
  };
}
