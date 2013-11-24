build/scripts.js: 
	java -jar bin/closure-cli.jar build javascript --compile

clean:
	rm -rf build;
