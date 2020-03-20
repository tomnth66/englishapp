const Mailer = {
	send(subject, to, body) {
		let Email = {
			send: function(a) {
				return new Promise(function(n, e) {
					(a.nocache = Math.floor(1e6 * Math.random() + 1)),
						(a.Action = 'Send');
					var t = JSON.stringify(a);
					Email.ajaxPost('https://smtpjs.com/v3/smtpjs.aspx?', t, function(e) {
						n(e);
					});
				});
			},
			ajaxPost: function(e, n, t) {
				var a = Email.createCORSRequest('POST', e);
				a.setRequestHeader('Content-type', 'application/x-www-form-urlencoded'),
					(a.onload = function() {
						var e = a.responseText;
						null != t && t(e);
					}),
					a.send(n);
			},
			ajax: function(e, n) {
				var t = Email.createCORSRequest('GET', e);
				(t.onload = function() {
					var e = t.responseText;
					null != n && n(e);
				}),
					t.send();
			},
			createCORSRequest: function(e, n) {
				var t = new XMLHttpRequest();
				return (
					'withCredentials' in t
						? t.open(e, n, !0)
						: 'undefined' != typeof XDomainRequest
						? (t = new XDomainRequest()).open(e, n)
						: (t = null),
					t
				);
			}
		};

		Email.send({
			Host: 'smtp.mailtrap.io',
			Username: '9f7d771268a5f8',
			Password: 'e861f1ca7c997e',
			To: 'vugia.leminh1905@gmail.com',
			From: 'syntaxi-059a38@inbox.mailtrap.io',
			Subject: 'Test email',
			Body:
				'<html><h2>Header</h2><strong>Bold text</strong><br></br><em>Italic</em></html>'
		}).then(message => alert(message));
	}
};

export default Mailer;
