<?php
/**
 * Plugin Name: ENG Placement Test — Parlango v3.1.11
 * Description: Shortcode [eng_placement_test]. Test de nivel de inglés con bloques de 10 preguntas, timer y envío a MailerLite.
 * Version:     3.1.11
 * Author:      Parlango
 * License:     GPLv3
 * Text Domain: engpt
 */

if ( ! defined( 'ENGPT_ML_KEY' ) ) {
    // Clave MailerLite (del código original).
    define(
        'ENGPT_ML_KEY',
        'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI0IiwianRpIjoiM2RlMTY1ODM0NDJmMmQ1NWJjZWM2MDBjZTI0OGUxNzFiZDA4YTQxYTYzYTM4NjZkZDdjZmEwZjY0YmI4ZmQ1YTIzYzE0ZGM3MjU3NGExZWYiLCJpYXQiOjE3NTUwMTE4MTAuMTE3OTgyLCJuYmYiOjE3NTUwMTE4MTAuMTE3OTg0LCJleHAiOjQ5MTA2ODU0MTAuMTEzMTI1LCJzdWIiOiI3NTEwNjYiLCJzY29wZXMiOltdfQ.QOp_YSvXkZRNp0hRaHiQ_bddOWJk0X2LVkbgXdLkHfuxkZsmrp3xJmS-72khm5elU6qbQ0WHpsSY8hyb7eddAZGo-nmNWotZJt5UfRsP6B6Kj08MBAyl4YzHDXe_PV26HL06ZdoD1NV6veZ3k4ahABYAgvHjpimNXRlVB6GndNgjdzQjOOxvqBVqz7q_Shl9OCnXrIH_pOAF_MkarNiGp7CIfotEOmsSxvF7ACu-aZX7x9a08li-wdfLT7dtQava_8ihwWi9Q_ODZs5teqNRD-QluqM0znFNSHkE7sxCrnQsnBzuImrt46_5btxvhp8t3kD05KgBtOEkwrRms2CB8_bHiAwEWIE4zC0Uma-Lkqq3g-PjDkhdt-7AHswsJpOfD-e7c6RJm_20UJ4MtlBu-MPwaKYOWvL7g4FhgLLIB1B1ku1kkZxi_LiGArbT2BezGIJ7Uja-boRiWbtjBsTQ8dF3QVnFdH7RsKLWiwZzTRM-GjDNqpVS8za6YA7vx5zNxchmhTb_TLoQmy0OKUWVmqfiGb2Pc2_4B-J6qaew36_R6bf9MnLykSUNmNBd-v53Bko6BuIpyyhv4VVzYDyNZ-jw9zfuxkgnXNfncv-SKBGVTWhl4f1bsl2eju_IsQGe7YtQCrMWem96fbuRpWQxx14-KmkUTWvc5ctrGa4ejCM'
    );
}
if ( ! defined( 'ENGPT_ML_GROUP' ) )  define( 'ENGPT_ML_GROUP', '162541721436030561' );
if ( ! defined( 'ENGPT_ADMIN_EMAIL' ) ) define( 'ENGPT_ADMIN_EMAIL', get_option( 'admin_email' ) ?: 'admin@example.com' );

load_plugin_textdomain( 'engpt', false, dirname( plugin_basename( __FILE__ ) ) . '/languages' );

global $engpt_should_enqueue;
$engpt_should_enqueue = false;

/** Shortcode principal */
function engpt_shortcode() {
    global $engpt_should_enqueue;
    $engpt_should_enqueue = true;
    ob_start(); ?>
    <div id="engpt" class="plg-wrap">
      <header class="plg-header" role="banner" aria-label="Cabecera Parlango">
        <div class="plg-header-left">
          <img src="http://www.parlango.com/wp-content/uploads/2023/08/PARLANGO.png" alt="Parlango" class="plg-logo" />
          <div class="plg-title">
            <h1>Parlango — Placement Test</h1>
            <p class="plg-sub">
              <strong>El test toma ~15 minutos.</strong> Verás <strong>4 bloques de 10 preguntas</strong> cada uno.
              Guardamos tu avance automáticamente y el <strong>temporizador inicia al marcar tu primera respuesta</strong>.
              <strong>Todas las respuestas son válidas</strong>: el sistema asigna puntajes distintos según lo natural/avanzado de tu elección.
              Al final verás una <strong>pregunta opcional</strong> para contarnos tu objetivo.
            </p>
          </div>
        </div>
        <div class="plg-header-right">
          <div class="plg-timer-controls" aria-label="Controles">
            <button type="button" class="plg-btn plg-btn-timer" id="btnTimer" aria-pressed="false">⏱ Iniciar 15:00</button>
            <a class="plg-btn plg-btn-help" id="btnHelp" href="#" role="button" aria-label="¿Necesitas ayuda?">¿Necesitas ayuda?</a>
            <button type="button" class="plg-btn plg-btn-reset" id="btnReset" title="Reiniciar test">↺ REINICIAR</button>
          </div>
          <div class="plg-progress" role="progressbar" aria-valuemin="0" aria-valuemax="40" aria-valuenow="0" aria-describedby="progressPct progressCount">
            <div class="plg-progress-bar" id="progressBar" style="width:0%"></div>
            <div class="plg-progress-meta"><span id="progressPct">0%</span><span id="progressCount">0/40</span></div>
          </div>
          <nav class="plg-steps" aria-label="Bloques">
            <button class="plg-step is-active" data-step="1" aria-current="step">1</button>
            <button class="plg-step" data-step="2" disabled>2</button>
            <button class="plg-step" data-step="3" disabled>3</button>
            <button class="plg-step" data-step="4" disabled>4</button>
          </nav>
        </div>
      </header>

      <div id="plg-toast" class="plg-toast" role="status" aria-live="polite" hidden></div>

      <main id="plg-main" class="plg-main">
        <form id="plg-form" novalidate>
          <?php for ( $s = 1; $s <= 4; $s++ ) : ?>
            <section class="plg-block" id="block-<?php echo $s; ?>" data-step="<?php echo $s; ?>" aria-labelledby="b<?php echo $s; ?>" <?php echo $s > 1 ? 'hidden' : ''; ?>>
              <h2 id="b<?php echo $s; ?>" class="plg-block-title">Bloque <?php echo $s; ?></h2>
              <div class="plg-questions" id="q-container-<?php echo $s; ?>"></div>
              <div class="plg-block-actions">
                <span id="missing-<?php echo $s; ?>" class="plg-missing" hidden>Faltan <b>0</b> preguntas por responder en este bloque.</span>
                <?php if ( $s < 4 ) : ?>
                  <button type="button" class="plg-btn plg-btn-next" data-next="<?php echo $s + 1; ?>">Continuar al bloque <?php echo $s + 1; ?></button>
                <?php endif; ?>
              </div>

              <?php if ( 4 === $s ) : ?>
                <div class="plg-final">
                  <h3>Envío de resultados</h3>
                  <p class="plg-note">Déjanos tu mejor correo para enviarte tu reporte y un plan recomendado acorde a tus objetivos.</p>

                  <div class="plg-field">
                    <label for="email">Correo electrónico *</label>
                    <input type="email" id="email" name="email" placeholder="tu-email@ejemplo.com" required inputmode="email" autocomplete="email" />
                    <small class="plg-error" id="email-error" hidden>Ingresa un correo válido (no usamos dominios temporales).</small>
                  </div>

                  <div class="plg-field">
                    <label for="name">Nombre completo *</label>
                    <input type="text" id="name" name="name" placeholder="Tu nombre" required autocomplete="name" />
                    <small class="plg-error" id="name-error" hidden>Solo letras y espacios.</small>
                  </div>

                  <div class="plg-field">
                    <label>Tu objetivo (opcional)</label>
                    <div class="plg-chips" id="goal">
                      <label><input type="radio" name="goal" value="Trabajo" />Trabajo</label>
                      <label><input type="radio" name="goal" value="Estudio" />Estudio</label>
                      <label><input type="radio" name="goal" value="Viaje" />Viaje</label>
                      <label><input type="radio" name="goal" value="Certificación" />Certificación</label>
                      <label><input type="radio" name="goal" value="Conversación" />Conversación</label>
                      <label><input type="radio" name="goal" value="Otro" />Otro</label>
                    </div>
                  </div>

                  <div class="plg-field plg-terms">
                    <label class="plg-checkbox">
                      <input type="checkbox" id="accept" />
                      <span>Acepto la <a href="#" id="linkPolicy">Política de Privacidad</a> y los <a href="#" id="linkTerms">Términos de uso</a>.</span>
                    </label>
                    <small class="plg-error" id="accept-error" hidden>Debes aceptar las políticas.</small>
                  </div>

                  <div class="plg-submit-area">
                    <button type="submit" id="btnSubmit" class="plg-btn plg-btn-submit">Ver mi nivel ahora</button>
                    <p class="plg-after" id="afterSubmit" hidden>¡Listo! Hemos recibido tu test. Revisa tu correo para ver tu resultado.</p>
                  </div>
                </div>
              <?php endif; ?>
            </section>
          <?php endfor; ?>
        </form>

        <section id="plg-result" class="plg-result" hidden aria-live="polite">
          <h2>Tu nivel con Parlango</h2>
          <p class="plg-level" id="levelText"></p>
          <div class="plg-distribution" id="distBars"></div>
          <div class="plg-ctas">
            <a href="#" id="ctaPlan" class="plg-btn plg-btn-primary">Ver plan recomendado</a>
            <a href="#" id="ctaChat" class="plg-btn plg-btn-ghost">Conversa con nosotros</a>
          </div>
          <details class="plg-explainer" style="margin-top:18px">
            <summary>¿Cómo calculamos tu nivel?</summary>
            <ul>
              <li>Analizamos 40 respuestas reales de uso cotidiano y profesional. Cada opción suma distinto para reflejar tu registro natural.</li>
              <li>El promedio (0–4) se mapea a la escala CEFR (A0–C2). También observamos tu mezcla de respuestas para sugerir próximos pasos.</li>
              <li>Recibirás por email tu resumen con distribución por niveles y recursos sugeridos.</li>
            </ul>
          </details>
        </section>
      </main>
    </div>
    <?php
    return ob_get_clean();
}
add_shortcode( 'eng_placement_test', 'engpt_shortcode' );

/** Encola CSS/JS sólo si se usa el shortcode */
function engpt_enqueue_assets() {
    global $engpt_should_enqueue;
    if ( ! $engpt_should_enqueue ) return;

    wp_enqueue_style( 'engpt', plugins_url( 'assets/engpt.css', __FILE__ ), [], '3.1.11' );
    wp_enqueue_script( 'engpt', plugins_url( 'assets/engpt.js', __FILE__ ), [], '3.1.11', true );

    wp_localize_script( 'engpt', 'ENGPT', [
        'api'     => rest_url( 'engpt/v1/submit' ),
        'nonce'   => wp_create_nonce( 'wp_rest' ),
        'policy'  => '#',
        'terms'   => '#',
        'ctaPlan' => [ 'A0'=>'#','A1'=>'#','A2'=>'#','B1'=>'#','B2'=>'#','C1'=>'#','C2'=>'#' ],
        'ctaChat' => '#'
    ] );
}
add_action( 'wp_enqueue_scripts', 'engpt_enqueue_assets' );

/** Endpoint REST */
add_action( 'rest_api_init', function () {
    register_rest_route( 'engpt/v1', '/submit', [
        'methods'  => 'POST',
        'callback' => 'engpt_submit',
        'permission_callback' => function ( $req ) {
            return wp_verify_nonce( $req->get_header( 'X-WP-Nonce' ), 'wp_rest' );
        }
    ] );
} );

function engpt_submit( WP_REST_Request $req ) {
    $ip   = $_SERVER['REMOTE_ADDR'] ?? '0.0.0.0';
    $key  = 'engpt_rate_' . md5( $ip );
    $hits = (int) get_transient( $key );
    if ( $hits >= 5 ) {
        return new WP_REST_Response( [ 'success' => false, 'message' => 'Too many requests' ], 429 );
    }
    set_transient( $key, $hits + 1, 10 * MINUTE_IN_SECONDS );

    $data = json_decode( $req->get_body(), true );
    if ( ! $data || empty( $data['email'] ) || empty( $data['name'] ) || empty( $data['answers'] ) ) {
        return new WP_REST_Response( [ 'success' => false, 'message' => 'Datos incompletos' ], 400 );
    }
    $email = sanitize_email( $data['email'] );
    $name  = sanitize_text_field( $data['name'] );
    $goal  = isset( $data['goal'] ) ? sanitize_text_field( $data['goal'] ) : '';
    $allowed_goals = [ '', 'Trabajo', 'Estudio', 'Viaje', 'Certificación', 'Conversación', 'Otro' ];
    if ( ! in_array( $goal, $allowed_goals, true ) ) {
        return new WP_REST_Response( [ 'success' => false, 'message' => 'Objetivo inválido' ], 400 );
    }
    if ( ! is_email( $email ) ) {
        return new WP_REST_Response( [ 'success' => false, 'message' => 'Email inválido' ], 400 );
    }

    $map = [ 'A'=>1, 'B'=>2, 'C'=>3, 'D'=>4, 'E'=>0 ];
    $sum = 0; $c = [ 'A'=>0,'B'=>0,'C'=>0,'D'=>0,'E'=>0 ];
    for ( $i = 1; $i <= 40; $i++ ) {
        if ( empty( $data['answers'][ $i ] ) || ! isset( $map[ $data['answers'][ $i ] ] ) ) {
            return new WP_REST_Response( [ 'success' => false, 'message' => "Falta respuesta en la pregunta {$i}" ], 400 );
        }
        $L = $data['answers'][ $i ];
        $sum += $map[ $L ];
        $c[ $L ]++;
    }
    $avg = $sum / 40;
    $v = $avg; $level = 'A0'; $cefr = 'A0';
    if ( $v > 3.50 ) { $level = 'C2'; $cefr = 'C2'; }
    elseif ( $v > 2.75 ) { $level = 'C1'; $cefr = 'C1'; }
    elseif ( $v > 2.25 ) { $level = 'B2'; $cefr = 'B2'; }
    elseif ( $v > 1.75 ) { $level = 'B1'; $cefr = 'B1'; }
    elseif ( $v > 1.25 ) { $level = 'A2'; $cefr = 'A2'; }
    elseif ( $v > 0.75 ) { $level = 'A1'; $cefr = 'A1'; }
    $pct = function ( $k ) use ( $c ) { return round( ( $c[ $k ] / 40 ) * 100 ); };
    $pctArr = [ 'A'=>$pct('A'), 'B'=>$pct('B'), 'C'=>$pct('C'), 'D'=>$pct('D'), 'E'=>$pct('E') ];

    if ( ENGPT_ML_KEY ) {
        $payload = [
            'email'  => $email,
            'fields' => [
                'name'    => $name,
                'level'   => $level,
                'cefr'    => $cefr,
                'avg'     => number_format( $avg, 2, '.', '' ),
                'pct_a'   => $pctArr['A'], 'pct_b' => $pctArr['B'], 'pct_c' => $pctArr['C'], 'pct_d' => $pctArr['D'], 'pct_e' => $pctArr['E'],
                'goal'    => $goal,
                'elapsed_s' => isset( $data['elapsed_s'] ) ? intval( $data['elapsed_s'] ) : null,
                'suspect' => 'no', 'suspect_reasons' => ''
            ],
            'groups' => [ ENGPT_ML_GROUP ]
        ];
        $res = wp_remote_post( 'https://api.mailerlite.com/api/v2/subscribers', [
            'timeout' => 15,
            'headers' => [ 'Content-Type' => 'application/json', 'X-MailerLite-ApiKey' => ENGPT_ML_KEY ],
            'body'    => wp_json_encode( $payload ),
        ] );
        if ( is_wp_error( $res ) ) {
            error_log( '[ENGPT ML] ' . $res->get_error_message() );
        } else {
            $code = wp_remote_retrieve_response_code( $res );
            if ( $code >= 400 ) {
                error_log( '[ENGPT ML] HTTP ' . $code . ' ' . wp_remote_retrieve_body( $res ) );
            }
        }
    }

    add_filter( 'wp_mail_content_type', 'engpt_email_content_type' );
    $subject_user  = 'Parlango — Tu nivel de inglés (' . $cefr . ')';
    $html_user     = engpt_email_user_html( $name, $email, $level, $cefr, $avg, $pctArr );
    wp_mail( $email, $subject_user, $html_user );

    $subject_admin = '[ENG Test] ' . $name . ' — ' . $cefr;
    $html_admin    = engpt_email_admin_html( $name, $email, $level, $cefr, $avg, $pctArr, $goal, $data['elapsed_s'] ?? null );
    wp_mail( ENGPT_ADMIN_EMAIL, $subject_admin, $html_admin );
    remove_filter( 'wp_mail_content_type', 'engpt_email_content_type' );

    return new WP_REST_Response( [ 'success' => true ], 200 );
}

function engpt_email_content_type() { return 'text/html; charset=UTF-8'; }

function engpt_btn( $url, $label, $bg = '#00A5D8', $color = '#fff' ) {
    $url = esc_url( $url ); $label = esc_html( $label );
    return '<table role="presentation" cellpadding="0" cellspacing="0" style="margin:0;border-collapse:separate"><tr><td style="border-radius:10px;background:' . $bg . '"><a href="' . $url . '" target="_blank" style="display:inline-block;padding:12px 18px;font-weight:600;text-decoration:none;color:' . $color . '">' . $label . '</a></td></tr></table>';
}

function engpt_email_user_html( $name, $email, $level, $cefr, $avg, $pct ) {
    $name = esc_html( $name ); $level = esc_html( $level ); $cefr = esc_html( $cefr ); $avg_txt = number_format( floatval( $avg ), 2 );
    $btn1 = engpt_btn( '#', 'Ver plan recomendado', '#00A5D8', '#fff' );
    $btn2 = engpt_btn( '#', 'Conversa con nosotros', '#ffffff', '#5274fe' );
    return '
    <div style="background:#F6F9FC;padding:20px 0;font-family:Poppins,Arial,sans-serif;color:#0F172A">
      <table role="presentation" width="100%"><tr><td align="center">
        <table role="presentation" width="600" style="background:#fff;border:1px solid #E2E8F0;border-radius:14px;">
          <tr><td style="padding:18px 20px;border-bottom:1px solid #E2E8F0">
            <img src="http://www.parlango.com/wp-content/uploads/2023/08/PARLANGO.png" alt="Parlango" width="36" style="vertical-align:middle;border-radius:50%;border:1px solid #E2E8F0;margin-right:8px" />
            <span style="font-size:18px;font-weight:700;">Parlango — Tu resultado</span>
          </td></tr>
          <tr><td style="padding:18px 20px">
            <p style="margin:0 0 10px;">Hola ' . $name . ' 👋</p>
            <p style="margin:0 0 12px;">Tu nivel estimado es <strong>' . $level . '</strong> (CEFR: <strong>' . $cefr . '</strong>), con promedio <strong>' . $avg_txt . '/4</strong>.</p>
            <div style="margin:12px 0">A ' . $pct['A'] . '% · B ' . $pct['B'] . '% · C ' . $pct['C'] . '% · D ' . $pct['D'] . '% · E ' . $pct['E'] . '%</div>
            <p style="margin:12px 0 18px;">Siguiente paso: revisa el plan recomendado o conversa con nosotros y trazamos tu ruta.</p>
            <table role="presentation" width="100%"><tr><td align="left">' . $btn1 . '</td><td align="right">' . $btn2 . '</td></tr></table>
            <p style="margin:18px 0 0;color:#64748B;font-size:13px;">¿Dudas? Responde este correo. — Equipo Parlango</p>
          </td></tr>
        </table>
      </td></tr></table>
    </div>';
}

function engpt_email_admin_html( $name, $email, $level, $cefr, $avg, $pct, $goal, $elapsed_s ) {
    $name = esc_html( $name ); $email = esc_html( $email ); $level = esc_html( $level ); $cefr = esc_html( $cefr );
    $avg_txt = number_format( floatval( $avg ), 2 ); $goal = esc_html( $goal ); $elapsed = $elapsed_s ? intval( $elapsed_s ) . ' s' : '—';
    return '
    <div style="background:#F6F9FC;padding:20px 0;font-family:Poppins,Arial,sans-serif;color:#0F172A">
      <table role="presentation" width="100%"><tr><td align="center">
        <table role="presentation" width="600" style="background:#fff;border:1px solid #E2E8F0;border-radius:14px;">
          <tr><td style="padding:18px 20px;border-bottom:1px solid #E2E8F0;font-weight:700">Nuevo resultado — ENG Placement Test</td></tr>
          <tr><td style="padding:18px 20px">
            <p><strong>Alumno:</strong> ' . $name . ' &lt;' . $email . '&gt;</p>
            <p><strong>Nivel:</strong> ' . $level . ' (' . $cefr . ') · <strong>Promedio:</strong> ' . $avg_txt . '</p>
            <p><strong>%:</strong> A ' . $pct['A'] . ' · B ' . $pct['B'] . ' · C ' . $pct['C'] . ' · D ' . $pct['D'] . ' · E ' . $pct['E'] . '</p>
            <p><strong>Objetivo:</strong> ' . $goal . '</p>
            <p><strong>Tiempo:</strong> ' . $elapsed . '</p>
          </td></tr>
        </table>
      </td></tr></table>
    </div>';
}
