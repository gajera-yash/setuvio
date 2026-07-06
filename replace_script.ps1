Get-ChildItem -Filter *.html | ForEach-Object {
    $content = Get-Content $_ -Raw
    $content = $content -replace '<div class="about-image"[^>]*>.*?</div>', '<div class="about-image"><img src="assets/images/team_office.png" alt="Office" style="width:100%;height:100%;object-fit:cover;border-radius:inherit"></div>'
    $content = $content -replace '<div class="product-card-image"[^>]*>.*?</div>', '<div class="product-card-image"><img src="assets/images/mobile_app.png" alt="Product" style="width:100%;height:100%;object-fit:cover;border-radius:inherit"></div>'
    $content = $content -replace '<div class="portfolio-card-image"[^>]*>.*?</div>', '<div class="portfolio-card-image"><img src="assets/images/workstation.png" alt="Portfolio" style="width:100%;height:100%;object-fit:cover;border-radius:inherit"></div>'
    $content = $content -replace '<div class="blog-card-image"[^>]*>.*?</div>', '<div class="blog-card-image"><img src="assets/images/workstation.png" alt="Blog" style="width:100%;height:100%;object-fit:cover;border-radius:inherit"></div>'
    Set-Content -Path $_ -Value $content
}
Write-Output "Replacement complete."
