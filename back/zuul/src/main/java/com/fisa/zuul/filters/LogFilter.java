package com.fisa.zuul.filters;

import com.netflix.zuul.ZuulFilter;
import com.netflix.zuul.exception.ZuulException;
import org.springframework.stereotype.Component;

import com.netflix.zuul.context.RequestContext;
import javax.servlet.http.HttpServletRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


@Component
public class LogFilter extends ZuulFilter 
{
    private static final Logger log = LoggerFactory.getLogger(LogFilter.class);
    
   @Override
   public String filterType() {
       return "pre"; 
   }
   
   @Override
   public boolean shouldFilter() {
       return true;  // Activer l'exécution du filtre
   }

   @Override
    public int filterOrder() {
        return 0; // L'ordre dans lequel ce filtre sera exécuté, par rapport aux autres filtres du même type
    }
   
   @Override
   public Object run() throws ZuulException {
       RequestContext ctx = RequestContext.getCurrentContext();
       HttpServletRequest request = ctx.getRequest();
       log.info(String.format("%s request to %s", request.getMethod(), request.getRequestURL().toString()));
      //  log.info("**** Requête interceptée ! L'URL est : {} " , request.getRequestURL());
       return null;
   }
   
}