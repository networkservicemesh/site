yarn:
	yarn

clean:
	rm -rf public resources

fetch-notes-build: 
	$(MAKE) -C .github/sync

fetch-notes: fetch-notes-build
	@echo make sure that GITHUB_TOKEN is set
	@GITHUB_TOKEN=$(GITHUB_TOKEN) bin/fetchnotes

serve: yarn
	hugo server \
		--buildDrafts \
		--buildFuture \
		--disableFastRender

production-build: clean
	hugo \
		--minify

	make check-internal-links

preview-build: clean
	hugo \
		--baseURL $(DEPLOY_PRIME_URL) \
		--buildDrafts \
		--buildFuture \
		--minify

	make check-internal-links

install-link-checker:
	curl https://raw.githubusercontent.com/wjdp/htmltest/master/godownloader.sh | bash

run-link-checker:
	bin/htmltest -l0

check-internal-links: install-link-checker run-link-checker
