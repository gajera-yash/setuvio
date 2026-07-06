Get-ChildItem -Filter *.html | ForEach-Object {
    $content = Get-Content $_ -Raw
    $content = $content -replace '<a href="index\.html" class="nav-brand"(.*?)>\s*<div class="logo-icon">S</div>\s*Setuvio\s*</a>', '<a href="index.html" class="nav-brand">
            <img src="assets/images/setuvio_logo.svg" alt="Setuvio Logo" class="logo-img">
          </a>'
    Set-Content -Path $_ -Value $content
}
Write-Output "Logo replacement complete."
