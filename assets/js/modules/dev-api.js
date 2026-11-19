/**
 * Alivio Developer API & Live Testing Hub (Alivio Storefront)
 * -------------------------------------------------------------
 * Provides developers and QA engineers with:
 * 1. window.AlivioDevAPI - Programmatic API client for console & automated scripts
 * 2. Live Email & SMS Dispatch testing engines with persistent telemetry
 * 3. Alivio Clinical Platform & EMR Simulator integration (MDI, Veluga, Telegra)
 * 4. Stripe Sandbox session & webhook event simulation
 */

(function () {
  'use strict';

  const STORAGE_KEY_DEV_LOGS = 'alivio_dev_api_logs';
  const STORAGE_KEY_DEV_CONFIG = 'alivio_dev_api_config';

  // Load or initialize persistent logs
  function getLogs() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY_DEV_LOGS);
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  }

  function appendLog(entry) {
    try {
      const logs = getLogs();
      logs.unshift({
        id: 'log_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5),
        timestamp: new Date().toISOString(),
        ...entry
      });
      // Keep last 50 logs
      if (logs.length > 50) logs.pop();
      localStorage.setItem(STORAGE_KEY_DEV_LOGS, JSON.stringify(logs));
      
      // Dispatch custom event for UI updates
      window.dispatchEvent(new CustomEvent('alivio:dev-log-update', { detail: logs[0] }));
    } catch (e) {
      console.warn('[AlivioDevAPI] Error logging event:', e);
    }
  }

  // Developer API SDK definition
  const AlivioDevAPI = {
    version: '1.2.0',
    platform: 'Alivio Multi-Tenant Architecture',
    store: {
      brand: 'Alivio Health',
      domain: (window.location && window.location.hostname) ? window.location.hostname : 'localhost',
      accountType: 'Alivio Unified Brand Account',
      environment: 'Demo / Sandbox'
    },

    // 1. Alivio Clinical Platform & EMR Integration
    astromd: {
      async syncPatientIntake(intakeData) {
        const payload = {
          tenantId: 'astromd_tenant_alivio_01',
          intakeSessionId: 'intake_' + Date.now(),
          timestamp: new Date().toISOString(),
          status: 'COMPLETED_PRE_CHECKOUT',
          data: intakeData || {
            healthGoal: 'Weight Care',
            ageRange: '30-39',
            biologicalSex: 'female',
            state: 'CA',
            medicalHistory: ['none']
          }
        };

        appendLog({
          service: 'Alivio Platform',
          action: 'syncPatientIntake',
          status: '200 OK',
          payload
        });

        console.info('[AlivioDevAPI] Alivio Patient Intake Synced:', payload);
        return { success: true, code: 200, message: 'Intake synced to Alivio EMR registry', payload };
      },

      async getStoreConfiguration() {
        const config = {
          brandId: 'alivio-health-core',
          astromdTenant: 'ASTROMD_CORE_CLUSTER_US',
          backendSimulators: ['MDI', 'Veluga', 'Telegra'],
          activeSimulator: window.AlivioTelemetry?.activeSimulator || 'MDI',
          paymentGateway: 'Stripe Sandbox (Store 1: Intake Before Checkout)',
          supportedTreatments: [
            { id: 'weight-loss', name: 'Weight Care Protocol' },
            { id: 'menopause', name: 'Hormone Care - Menopause' },
            { id: 'testosterone', name: 'Hormone Care - Testosterone' },
            { id: 'hair-loss', name: 'Hair Restoration' },
            { id: 'sexual-health', name: 'Sexual Wellness' }
          ]
        };

        appendLog({
          service: 'Alivio Platform',
          action: 'getStoreConfiguration',
          status: '200 OK',
          payload: config
        });

        return config;
      }
    },

    // 2. Clinical EMR Simulators (MDI, Veluga, Telegra)
    simulators: {
      async sendToEMR(providerName, patientRecord) {
        const provider = (providerName || 'MDI').toUpperCase();
        const validProviders = {
          MDI: { name: 'MD Integrations (MDI)', url: 'https://sandbox.mdintegrations.com/api/v1/telehealth' },
          VELUGA: { name: 'Veluga Health EMR', url: 'https://sandbox.velugahealth.com/api/v2/intake' },
          TELEGRA: { name: 'Telegra Clinical Network', url: 'https://sandbox.telegra.md/api/consults' }
        };

        const target = validProviders[provider] || validProviders.MDI;
        const consultId = 'cns_' + provider.toLowerCase() + '_' + Math.random().toString(36).substr(2, 9);

        const dispatchPayload = {
          consultId,
          emrProvider: target.name,
          endpoint: target.url,
          patient: patientRecord || {
            firstName: 'Demo',
            lastName: 'Patient',
            email: 'test-patient@alivio.health',
            phone: '+1 (555) 019-2834',
            chiefComplaint: 'Weight management & metabolic optimization'
          },
          dispatchedAt: new Date().toISOString()
        };

        // If telemetry exists, update active simulator
        if (window.AlivioTelemetry) {
          window.AlivioTelemetry.activeSimulator = provider === 'VELUGA' ? 'Veluga' : (provider === 'TELEGRA' ? 'Telegra' : 'MDI');
        }

        appendLog({
          service: `EMR Simulator (${provider})`,
          action: 'sendToEMR',
          status: '201 CREATED',
          payload: dispatchPayload
        });

        console.info(`[AlivioDevAPI] Dispatched to EMR Simulator [${provider}]:`, dispatchPayload);
        return { success: true, consultId, provider: target.name, payload: dispatchPayload };
      }
    },

    // 3. Live Email & SMS Testing Dispatcher
    messaging: {
      async sendLiveEmail(options) {
        const to = options?.to || 'developer@alivio.health';
        const subject = options?.subject || 'Alivio Health — Demo Account Notification';
        const type = options?.type || '1_HOUR_REMINDER';
        const timestamp = new Date().toISOString();

        const emailPayload = {
          to,
          from: 'clinical-care@alivio.health',
          subject,
          type,
          headers: {
            'X-Alivio-Brand': 'Alivio',
            'X-Alivio-Tenant': 'Tenant-01',
            'X-Test-Mode': 'Live Testing Account'
          },
          bodyHtml: `
            <div style="font-family: sans-serif; color: #260D03; max-width: 600px; padding: 24px;">
              <h2>Alivio Health Care Consultation</h2>
              <p>Hello,</p>
              <p>${options?.message || 'Your personalized telehealth evaluation is pending clinician review.'}</p>
              <a href="${(window.location && window.location.origin) ? window.location.origin : 'http://localhost:3000'}/#intake" style="display:inline-block; padding:12px 24px; background:#173F35; color:#fff; text-decoration:none; border-radius:99px;">Continue Evaluation</a>
            </div>
          `,
          sentAt: timestamp
        };

        appendLog({
          service: 'Live Email Dispatcher',
          action: 'sendLiveEmail',
          recipient: to,
          status: 'DELIVERED (SIMULATED)',
          payload: emailPayload
        });

        console.info('[AlivioDevAPI] Live Email Dispatched:', emailPayload);
        return { success: true, messageId: 'msg_em_' + Date.now(), recipient: to, payload: emailPayload };
      },

      async sendLiveSMS(options) {
        const to = options?.to || '+1 (555) 019-2834';
        const message = options?.message || 'Alivio Health: Your clinician is ready to review your health goals. Complete your intake here: ' + window.location.origin;
        const type = options?.type || 'REMINDER_SMS';
        const timestamp = new Date().toISOString();

        const smsPayload = {
          to,
          from: '+1 (800) 555-ALIVIO',
          type,
          body: message,
          segments: 1,
          status: 'DELIVERED (LIVE SIMULATION)',
          sentAt: timestamp
        };

        appendLog({
          service: 'Live SMS Dispatcher',
          action: 'sendLiveSMS',
          recipient: to,
          status: 'DELIVERED (SIMULATED)',
          payload: smsPayload
        });

        console.info('[AlivioDevAPI] Live SMS Dispatched:', smsPayload);
        return { success: true, sid: 'SM_' + Math.random().toString(36).substr(2, 12), recipient: to, payload: smsPayload };
      }
    },

    // 4. Automation Reminders (1-Hour and 1-Day)
    automation: {
      async triggerReminderNow(intervalType, targetEmail, targetPhone) {
        const interval = intervalType === '1_DAY' ? '1_DAY' : '1_HOUR';
        const email = targetEmail || 'developer@alivio.health';
        const phone = targetPhone || '+1 (555) 019-2834';

        const subject = interval === '1_HOUR'
          ? 'Action Required: Complete your Alivio clinician evaluation (1-Hour Reminder)'
          : 'Reminder: Your Alivio provider is waiting for your intake details (1-Day Reminder)';

        const smsBody = interval === '1_HOUR'
          ? 'Alivio Health: 1-Hour check-in: Complete your 3-minute intake so your provider can review your prescription.'
          : 'Alivio Health: 1-Day reminder: Your provider is waiting for your health history. Tap to complete.';

        // Dispatch Email
        const emailRes = await AlivioDevAPI.messaging.sendLiveEmail({
          to: email,
          subject,
          type: interval,
          message: smsBody
        });

        // Dispatch SMS
        const smsRes = await AlivioDevAPI.messaging.sendLiveSMS({
          to: phone,
          type: interval,
          message: smsBody
        });

        appendLog({
          service: 'Automation Reminder Engine',
          action: 'triggerReminderNow',
          status: 'DISPATCHED_BOTH',
          payload: { interval, emailRes, smsRes }
        });

        return { success: true, interval, emailRes, smsRes };
      }
    },

    // 5. Stripe Sandbox Payment Client
    stripe: {
      async createPaymentIntent(amount, sku, customer) {
        const intent = {
          id: 'pi_test_' + Math.random().toString(36).substr(2, 16),
          amount: amount || 8900,
          currency: 'usd',
          status: 'requires_payment_method',
          sku: sku || 'prod_alivio_glp1_semaglutide',
          customer: customer || { email: 'developer@alivio.health' },
          clientSecret: 'pi_test_secret_' + Math.random().toString(36).substr(2, 18),
          created: Math.floor(Date.now() / 1000)
        };

        appendLog({
          service: 'Stripe Sandbox',
          action: 'createPaymentIntent',
          status: '200 OK',
          payload: intent
        });

        return intent;
      }
    },

    // Helper functions
    getLogs,
    clearLogs() {
      localStorage.removeItem(STORAGE_KEY_DEV_LOGS);
      window.dispatchEvent(new CustomEvent('alivio:dev-log-update', { detail: null }));
      return { success: true, message: 'Developer API logs cleared.' };
    }
  };

  // Expose to global scope for developer access anytime
  window.AlivioDevAPI = AlivioDevAPI;

  // ==========================================================================
  
  // Expose to global scope for developer access anytime in browser console / automated scripts
  window.AlivioDevAPI = AlivioDevAPI;
  console.info(
    "%c[Alivio Storefront] Developer API Ready. Access via `AlivioDevAPI` in console anytime.",
    "background:#5B2009; color:#FFEBC4; font-weight:bold; padding:4px 8px; border-radius:4px;"
  );
})();
